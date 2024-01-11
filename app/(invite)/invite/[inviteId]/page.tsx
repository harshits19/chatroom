import { redirect } from "next/navigation"
import { redirectToSignIn } from "@clerk/nextjs"
import AcceptInviteModal from "@/components/modals/AcceptInviteModal"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

interface InvitePageProps {
  params: {
    inviteId: string
  }
}
const InvitePage = async ({ params: { inviteId } }: InvitePageProps) => {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()
  if (!inviteId) return redirect("/")

  //checking whether if user is already part of this server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: inviteId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })
  //if user is already member of this server then redirect him to server-home page
  if (existingServer) return redirect(`/servers/${existingServer.id}`)

  const server = await db.server.findFirst({
    where: {
      inviteCode: inviteId,
    },
    include: {
      profile: true,
      members: true,
    },
  })

  if (!server) return redirect("/")

  //if user is not a member(user currently logged in & inviteId is valid) then ask him to accept invite
  return <AcceptInviteModal server={server} />
}
export default InvitePage
