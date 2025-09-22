"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { LogOutIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChannelHeader, MessageInput, MessageList, Thread } from "stream-chat-react";
import { Channel, useChatContext, Window } from "stream-chat-react";

const handleCall = () => {
  console.log("Starting a video call...");
};

const handleLeaveChat = () => {
    console.log("Leaving...");
  };

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const { channel, setActiveChannel } = useChatContext();
  const { setOpen } = useSidebar();
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
                  className="text-ted-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                >
                  <LogOutIcon className="w-4 h-4 mr-1" />
                  Leave Chat
                </Button>
              </div>

              <MessageList />
              <div className="sticky bottom-0 w-full">
                <MessageInput />
              </div>
            </div>
          </Window>
          <Thread />
        </Channel>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
            No Chat Selected
          </h2>
          <p className="text-muted-foreground">
            Start a new chat or select an existing one from the sidebar.
          </p>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
