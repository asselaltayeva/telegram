"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { LogOutIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
} from "stream-chat-react";
import { Channel, useChatContext, Window } from "stream-chat-react";

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const { channel, setActiveChannel } = useChatContext();
  const { setOpen } = useSidebar();

  const handleLeaveChat = async () => {
    if (!channel || !user?.id) {
      console.log("No active channel or user");
      return;
    }

    // Confirm before leaving
    const confirm = window.confirm("Are you sure you want to leave this chat?");
    if (!confirm) return;

    try {
      // Remove user from channel members
      await channel.removeMembers([user.id]);

      // Clear active channel
      setActiveChannel(undefined);

      // Redirect to dashboard after leaving
      router.push("/dashboard");
    } catch (error) {
      console.error("Error leaving the chat:", error);
    }
  };

  const handleCall = async () => {
    if (!channel) return;
    router.push(`/dashboard/video-call/${channel.id}`);
    setOpen(false);
  };

  return (
    <div className="flex flex-col w-full flex-1">
      {channel ? (
        <Channel>
          <Window>
            <div className="flex items-center justify-between">
              {channel.data?.member_count === 1 ? (
                <ChannelHeader title="You're now an admin" />
              ) : (
                <ChannelHeader />
              )}

              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleCall}>
                  <VideoIcon className="w-4 h-4 mr-1" />
                  VideoCall
                </Button>

                <Button
                  variant="outline"
                  onClick={handleLeaveChat}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                >
                  <LogOutIcon className="w-4 h-4 mr-1" />
                  Leave Chat
                </Button>
              </div>
            </div>

            <MessageList />
            <div className="sticky bottom-0 w-full">
              <MessageInput />
            </div>
          </Window>
          <Thread />
        </Channel>
      ) : (
        <div className="relative rounded-xl overflow-hidden flex flex-1 items-center justify-center w-full h-96">
          <div className="relative z-10 bg-white/30 rounded-xl p-12 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-semibold text-black mb-2">
              No Chat Selected
            </h2>
            <p className="text-black text-sm">
              Start a new chat or select an existing one from the sidebar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
