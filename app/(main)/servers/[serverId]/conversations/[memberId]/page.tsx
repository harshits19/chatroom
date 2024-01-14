import ChatHeader from "@/components/chat-section/ChatHeader"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"
import { getOrCreateConversations } from "@/lib/getConversation"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface MemberIdPageProps {
  params: {
    memberId: string
    serverId: string
  }
}

const MemberIdPage = async ({ params: { memberId, serverId } }: MemberIdPageProps) => {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  const currentMember = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  })
  if (!currentMember) return redirect("/")

  const conversation = await getOrCreateConversations(currentMember.id, memberId)
  if (!conversation) return redirect(`/servers/${serverId}`)

  const { memberOne, memberTwo } = conversation

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        name={otherMember.profile.name}
        serverId={serverId}
        type="conversation"
        imageUrl={otherMember.profile.imageUrl}
      />
    </div>
  )
}
export default MemberIdPage
