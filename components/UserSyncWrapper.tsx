"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import streamClient from "@/lib/stream";
import { createToken } from "@/actions/createToken";

function UserSyncWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // convex mutation to sync user data
  const createOrUpdateUser = useMutation(api.users.upsertUser);

  const syncUser = useCallback(async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      const tokenProvider = async () => {
        const token = await createToken(user.id);
        return token;
      };

      // 1. Save user to Convex
      await createOrUpdateUser({
        userId: user.id,
        name:
          user.fullName ||
          user.firstName ||
          user.emailAddresses[0]?.emailAddress ||
          "Unknown User",
        email: user.emailAddresses[0]?.emailAddress || "",
        imageUrl: user.imageUrl || "",
      });

      // 2. Connect user to Stream
      await streamClient.connectUser(
        {
          id: user.id,
          name:
            user.fullName ||
            user.firstName ||
            user.emailAddresses[0]?.emailAddress ||
            "Unknown User",
          image: user.imageUrl || "",
        },
        tokenProvider
      );
    } catch (error) {
      console.error("Error syncing user data:", error);
      setError(
        error instanceof Error ? error.message : "Failed to sync user data"
      );
    } finally {
      setIsLoading(false);
    }
  }, [createOrUpdateUser, user]);

  // disconnect user
  const disconnectUser = useCallback(async () => {
    try {
      console.log("Disconnecting user...");
      await streamClient.disconnectUser();
    } catch (error) {
      console.error("Error disconnecting user from Stream:", error);
    }
  }, []);

  useEffect(() => {
    if (isUserLoaded) {
      if (user) {
        syncUser();
      } else {
        disconnectUser();
        setIsLoading(false);
      }
    }

    // cleanup function
    return () => {
      disconnectUser();
    };
  }, [user, isUserLoaded, syncUser, disconnectUser]);

  // loading state
  if (!isUserLoaded || isLoading) {
    return (
      <LoadingSpinner
        size="lg"
        message={!isUserLoaded ? "Loading user data..." : "Syncing user data..."}
        className="min-h-screen"
      />
    );
  }

  // error state
  if (error) {
    return (
      <div className="flex-1 items-center justify-center bg-white px-6">
        <p className="text-red-500 text-lg font-semibold mb-2">Sync Error</p>
        <p className="text-gray-600 text-center mb-4">{error}</p>
        <p className="text-gray-500 text-sm text-center">
          Please, try restarting the app or contact support if the issue
          persists.
        </p>
        <button
          onClick={syncUser}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

export default UserSyncWrapper;
