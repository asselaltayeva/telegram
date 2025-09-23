"use client"

import { Doc } from "@/convex/_generated/dataModel";
import { useState } from "react"
import { useUser } from "@clerk/nextjs";
import { useChatContext } from "stream-chat-react";


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
    return (
      <>{children}</>
    )
}