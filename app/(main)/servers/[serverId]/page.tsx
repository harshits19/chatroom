import { redirect } from "next/navigation"
import { redirectToSignIn } from "@clerk/nextjs"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

interface ServerIdPageProps {
  params: {
    serverId: string
  }
}

const ServerIdPage = async ({ params: { serverId } }: ServerIdPageProps) => {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  //finding the server in which this user is a member
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  })

  const initialChannel = server?.channels[0]

  if (initialChannel?.name !== "general") return null

  return redirect(`/servers/${serverId}/channels/${initialChannel?.id}`)
}
export default ServerIdPage
