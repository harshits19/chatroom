import { redirect } from "next/navigation"
import { ChannelType, MemberRole } from "@prisma/client"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import ServerHeader from "@/components/server-sidebar/ServerHeader"
import ServerSearchbar from "@/components/server-sidebar/ServerSearchbar"
import ServerSection from "@/components/server-sidebar/ServerSection"
import ServerChannel from "@/components/server-sidebar/ServerChannel"
import UserProfileCard from "@/components/server-sidebar/UserProfileCard"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"
import { Hash, ShieldCheck, ShieldEllipsisIcon, Video, Volume2 } from "lucide-react"

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

  const mapIconByChannelType = {
    [ChannelType.TEXT]: <Hash className="mr-2 size-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 size-4" />,
    [ChannelType.AUDIO]: <Volume2 className="mr-2 size-4" />,
  }

  const mapIconByRole = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 size-4 text-theme-foreground" />,
    [MemberRole.ADMIN]: <ShieldEllipsisIcon className="mr-2 size-4 text-theme-secondary" />,
  }


  const data = [
    {
      label: "Text Channels",
      type: "channel" as const,
      data: textChannels?.flatMap((channel) => ({
        id: channel.id,
        name: channel.name,
        icon: mapIconByChannelType[channel.type],
      })),
    },
    {
      label: "Voice Channels",
      type: "channel" as const,
      data: audioChannels?.flatMap((channel) => ({
        id: channel.id,
        name: channel.name,
        icon: mapIconByChannelType[channel.type],
      })),
    },
    {
      label: "Video Channels",
      type: "channel" as const,
      data: videoChannels?.flatMap((channel) => ({
        id: channel.id,
        name: channel.name,
        icon: mapIconByChannelType[channel.type],
      })),
    },
    {
      label: "Members",
      type: "member" as const,
      data: members?.flatMap((member) => ({
        id: member.id,
        name: member.profile.name,
        icon: mapIconByRole[member.role],
      })),
    },
  ]

  return (
    <div className="flex flex-col h-full w-full text-primary bg-[#F2F3F5] dark:bg-[#2B2D31]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-2">
        <div className="mt-2">
          <ServerSearchbar data={data} />
        </div>
        <Separator className="my-2 rounded-md h-0.5" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
              server={server}
            />
            {textChannels.map((channel) => (
              <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
            ))}
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
              server={server}
            />
            {audioChannels.map((channel) => (
              <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
            ))}
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
              server={server}
            />
            {videoChannels.map((channel) => (
              <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
            ))}
          </div>
        )}
      </ScrollArea>
      <UserProfileCard profile={profile} />
    </div>
  )
}
export default ServerSidebar
