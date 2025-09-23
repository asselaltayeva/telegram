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

    return (
      <>{children}</>
    )
}