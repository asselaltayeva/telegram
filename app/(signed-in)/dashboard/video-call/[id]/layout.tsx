"use client";
import { createToken } from "@/actions/createToken";
import { InlineSpinner } from "@/components/LoadingSpinner";
import { StatusCard } from "@/components/StatusCard";
import { useUser } from "@clerk/nextjs";
import {
    Call,
    CallingState,
    StreamCall,
    StreamVideo,
    StreamTheme,
    StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { AlertTriangle, Video } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";

if (!process.env.NEXT_PUBLIC_STREAM_API_KEY){
    throw new Error("NEXT_PUBLIC_STREAM_API_KEY is not defined");
}

function Layout({children}: {children: React.ReactNode}) {
    const { user } = useUser();
    const {id} = useParams();
    const [call, setCall] = useState<Call | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [client, setClient] = useState<StreamVideoClient | null>(null);

    const streamUser = useMemo(()=> {
        if (!user?.id) return null;

        return {
            id: user.id,
            name:
                user.fullName || user.emailAddresses[0]?.emailAddress || "Unknown",
            image: user.imageUrl || "",
            type: "authenticated" as const,
        };
    }, [user]);

    //token provider function to avoid fetching token on every render
    const tokenProvider = useCallback(async () => {
        if (!user?.id) {
            throw new Error("User is not authenticated");
        }
        return await createToken(user.id);
    }, [user?.id]);

    // initialize client in useEffect to avoid creating multiple instances
    useEffect(() => {
        if (!streamUser) {
            setClient(null);
            return;
        }

        const newClient = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY as string,
            user: streamUser,
            tokenProvider
        })

        setClient(newClient);

        return () => {
            newClient.disconnectUser().catch(console.error);
        };
    }, [streamUser, tokenProvider]);

    useEffect(() => {
        if (!client || !id) return;

        setError(null);
        const streamCall = client.call ("default", id as string);

        const joinCall = async () => {
            try {
                await streamCall.join({create: true});
                setCall(streamCall);
            } catch (error) {
                console.error("Failed to join the call", error);
                setError(
                    error instanceof Error ? error.message : "Failed to join the call"
                );
            }
        };

        joinCall();

        // clean up previous call if any
        return () => {
            if (streamCall && streamCall.state.callingState === CallingState.JOINED) {
                streamCall.leave().catch(console.error);
            }
        }

    },[id,client]);

    if (error) {
        return (
            <StatusCard 
                title="Call Error"
                description={error}
                className="min-h-screen bg-red-50"
                action={
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibol py-3 px-6
                        rounded-lg transition-colors duration-200 focus: outline-none focus:ring-2 focus:ring-red-500
                        focus:ring-offset-2"
                        >
                            Retry
                        </button>
                }
            >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-8 h-8 text-red-600"/>
                </div>
            </StatusCard>
        )
    }

    if (!client) {
        return (
            <StatusCard
                title="Initializing..."
                description="Setting up video call..."
                className="min-h-screen bg-blue-50"
            >
                <InlineSpinner size="lg" />
            </StatusCard>
        );
    }

    if (!call) {
        return (
            <StatusCard
                title="Joining Call..."
                className="min-h-screen bg-green-50"
            >
                <div className="animate-bounce h-16 w-16 mx-auto">
                    <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                        <Video className="w-8 h-8 text-green-600"/>
                    </div>
                </div>
                <div className="text-black font-mono text-sm bg-green-100 px-3 py-1 rounded-full inline-block">
                    Call ID: {id}
                </div>
            </StatusCard>     
        );
    }

    return (
    <StreamVideo client={client}>
        <StreamTheme className="text-white">
            <StreamCall call={call}>{children}</StreamCall>
        </StreamTheme>
    </StreamVideo>
  )
}

export default Layout