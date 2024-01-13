import { redirect } from "next/navigation"
import { redirectToSignIn } from "@clerk/nextjs"
import ChatHeader from "@/components/chat-section/ChatHeader"
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

  if (!channel || !member) return redirect("/")

  return (
    <div className="flex flex-col h-full">
      <ChatHeader name={channel.name} serverId={serverId} type="channel" />
      {channelId}
    </div>
  )
}
export default ChannelIdPage
