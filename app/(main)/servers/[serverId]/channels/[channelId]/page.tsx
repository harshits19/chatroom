import { redirect } from "next/navigation"
import { redirectToSignIn } from "@clerk/nextjs"
import ChatHeader from "@/components/chat-section/ChatHeader"
import MemberSidebar from "@/components/chat-section/MemberSidebar"
import ChatInput from "@/components/chat-section/ChatInput"
import ChatMessages from "@/components/chat-section/ChatMessages"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

interface ChannelIdPageProps {
  params: {
    channelId: string
    serverId: string
  }
}

const ChannelIdPage = async ({ params: { channelId, serverId } }: ChannelIdPageProps) => {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  })

  //finding member details of current user in that particular server
  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  })

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  })

  if (!channel || !member || !server) return redirect("/")

  return (
    <div className="flex flex-col h-full">
      <ChatHeader name={channel.name} serverId={serverId} type="channel" />
      <div className="relative flex h-[calc(100vh-50px)]">
        <div className="flex flex-col w-full">
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channelId}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channelId}
          />
          <ChatInput
            apiUrl="/api/socket/messages"
            name={channel.name}
            type="channel"
            query={{
              channelId: channel.id,
              serverId: server.id,
            }}
          />
        </div>
        <MemberSidebar server={server} />
      </div>
    </div>
  )
}
export default ChannelIdPage
