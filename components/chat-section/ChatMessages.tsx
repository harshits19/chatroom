"use client"

import { Member } from "@prisma/client"
import ChatIntro from "./ChatIntro"

interface ChatMessagesProps {
  name: string
  member: Member
  chatId: string
  apiUrl: string
  socketUrl: string
  socketQuery: Record<string, string>
  paramKey: "channelId" | "conversationId"
  paramValue: string
  type: "channel" | "conversation"
}

const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  return (
    <div className="flex flex-col justify-end flex-1 h-full pt-4 overflow-y-auto">
      <ChatIntro type={type} name={name} />
    </div>
  )
}
export default ChatMessages
