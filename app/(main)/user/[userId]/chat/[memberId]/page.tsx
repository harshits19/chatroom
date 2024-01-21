import ChatHeader from "@/components/chat-section/ChatHeader"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"
import { getOrCreateConversations } from "@/lib/getConversation"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface ChatPageProps {
  params: {
    memberId: string
  }
}

const ChatPage = async ({ params: { memberId } }: ChatPageProps) => {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

/*   const currentMember = await db.member.findFirst({
    where: {
      serverId: memberId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  })
  if (!currentMember) return redirect("/") */

  /* const conversation = await getOrCreateConversations(currentMember.id, chat)
  if (!conversation) return redirect(`/servers/${serverId}`)

  const { memberOne, memberTwo } = conversation

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne */

  return (
    <div className="flex flex-col h-full">
      {/*  <ChatHeader
        name={otherMember.profile.name}
        serverId={serverId}
        type="conversation"
        imageUrl={otherMember.profile.imageUrl}
      /> */}
    </div>
  )
}
export default ChatPage
