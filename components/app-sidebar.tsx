"use client";

import * as React from "react";
import { MessageSquarePlus, Users, Search } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import { ChannelList } from "stream-chat-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { ChannelFilters, ChannelSort } from "stream-chat";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const filters: ChannelFilters = {
    members: { $in: [user?.id as string] },
    type: { $in: ["messaging", "team"] },
  };
  const options = { presence: true, state: true };
  const sort: ChannelSort = { last_message_at: -1 };

  return (
    <Sidebar
      variant="floating"
      className="backdrop-blur-md border-r shadow-lg
  dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
  bg-gradient-to-b from-gray-100 via-gray-50 to-white
"
      {...props}
    >
      {/* Header with user info */}
      <SidebarHeader className="px-4 py-3 border-b border-slate-700/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="rounded-xl">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Welcome back
                  </span>
                  <span className="text-sm font-semibold">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <UserButton signInUrl="/sign-in" afterSignOutUrl="/" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1 p-3">
            <Button
              className="w-full rounded-xl font-medium shadow-md hover:shadow-lg transition-transform"
              variant="default"
            >
              <MessageSquarePlus className="h-4 w-4 mr-1" />
              Start New Chat
            </Button>

            {/* Channel List */}
            <ChannelList
              filters={filters}
              sort={sort}
              options={options}
              EmptyStateIndicator={() => (
                <div className="flex flex-col items-center justify-center h-full py-55 px-6 text-center">
                  <div className="text-6xl mb-6 opacity-30 animate-bounce">
                    💬
                  </div>
                  <h2 className="text-lg font-semibold mb-2">Ready to chat?</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    You have no contacts on Telegram yet
                  </p>

                  <div className="space-y-2 w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-xl"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      Invite Friends
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-xl"
                    >
                      <Search className="h-4 w-4 mr-1" />
                      Find Your People
                    </Button>
                  </div>
                </div>
              )}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
