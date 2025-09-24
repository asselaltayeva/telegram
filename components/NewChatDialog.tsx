"use client"

import { Doc } from "@/convex/_generated/dataModel";
import { useState } from "react"
import { useUser } from "@clerk/nextjs";
import { useChatContext } from "stream-chat-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UserSearch from "./UserSearch";


export function NewChatDialog( {children} : {children: React.ReactNode}) {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Doc<"users">[]>([]);
  const [groupName, setGroupName] = useState("");
  const {user} = useUser();
  const {setActiveChannel} = useChatContext();

  //select user from the list
  const handleSelectUser = (user: Doc<"users">) => {
    // avoid adding the same users twice
    if (!selectedUsers.find((u) => u._id === user._id)) {
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  // delete user from the list
  const removeUser = (userId: string) => {
   setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
  }

  // handle dialog open state
const handleOpenChange = (newOpen: boolean) => {
  setOpen(newOpen);
  if (!newOpen) {
    // reset state when dialog is closed
    setSelectedUsers([]);
    setGroupName("");
  }
};

    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
          <DialogTitle>Start a New Chat</DialogTitle>
          <DialogDescription>
            Search for users to start a new chat or create a group chat.
          </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
          {/* User search input */}
          <UserSearch onSelectUser={handleSelectUser} className="w-full"/>

          </div>
        </DialogContent>
        </Dialog>
    )
}