import { redirect } from "next/navigation"
import ServerHeader from "@/components/server-sidebar/ServerHeader"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"
import { ChannelType } from "@prisma/client"

const ServerSidebar = async ({ serverId }: { serverId: string }) => {
  const profile = await currentProfile()
  if (!profile) return redirect("/")

  //get server details
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  })
  if (!server) return redirect("/")

  //filter all types of channel
  const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
  const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
  const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
  //filter current user from the members list
  const members = server?.members.filter((member) => member.profileId !== profile.id)

  //get role of current user
  const role = server.members.find((member) => member.profileId === profile.id)?.role

  return (
    <div className="flex flex-col h-full text-primary w-ful bg-[#F2F3F5] dark:bg-[#2B2D31]">
      <ServerHeader server={server} role={role} />
      ServerSidebar
    </div>
  )
}
export default ServerSidebar
