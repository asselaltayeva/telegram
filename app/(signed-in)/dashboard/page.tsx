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
import Beams from "@/components/Beams";

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
        <div className="relative rounded-xl overflow-hidden flex flex-1 items-center justify-center w-full h-96">
          <div className="absolute inset-0">
            <Beams
              beamWidth={4.6}
              beamHeight={29}
              beamNumber={23} // fewer beams
              lightColor="#ffffff" // softer
              speed={2}
              noiseIntensity={1.75}
              scale={0.122}
              rotation={30}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/10 "></div>
          <div className="relative z-10 bg-black/20 rounded-xl p-12 flex flex-col items-center justify-center text-center shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-2">
              No Chat Selected
            </h2>
            <p className="text-white/70 text-sm">
              Start a new chat or select an existing one from the sidebar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
