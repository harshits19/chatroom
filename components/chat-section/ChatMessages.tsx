"use client"

import { Fragment } from "react"
import { Member, Message, Profile } from "@prisma/client"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatIntro from "@/components/chat-section/ChatIntro"
import MessageCard from "@/components/chat-section/MessageCard"
import { useChatQuery } from "@/hooks/useChatQuery"
import { Loader2, ServerCrash } from "lucide-react"

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

type MessageWMemberWProfile = Message & {
  member: Member & {
    profile: Profile
  }
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
  const queryKey = `chat:${chatId}`

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  })

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <Loader2 className="size-7 animate-spin text-main" />
        <p className="text-xs text-main">Loading Messages...</p>
      </div>
    )
  }
  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <ServerCrash className="size-7 text-main" />
        <p className="text-xs text-main">Something went wrong!</p>
      </div>
    )
  }

  return (
    <ScrollArea className="flex flex-col h-full pt-4">
      <ChatIntro type={type} name={name} />
      <div className="flex flex-col-reverse">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWMemberWProfile) => (
              <MessageCard
                key={message.id}
                id={message.id}
                member={message.member}
                currentMember={member}
                content={message.content}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                timestamp={message.createdAt}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
export default ChatMessages
