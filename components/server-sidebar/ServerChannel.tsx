"use client"

import { useParams, useRouter } from "next/navigation"
import { Channel, MemberRole, Server } from "@prisma/client"
import ActionTooltip from "@/components/ActionTooltip"
import { ModalType, useModal } from "@/hooks/useModalStore"
import { mapIconByChannelType } from "@/lib/config"
import { cn } from "@/lib/utils"
import { Settings, Trash } from "lucide-react"

interface ServerChannelProps {
  channel: Channel
  server: Server
  role?: MemberRole
}

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const params = useParams()
  const router = useRouter()
  const { onOpen } = useModal()

  const Icon = mapIconByChannelType[channel.type]

  const onClick = () => {
    router.push(`/servers/${server?.id}/channels/${channel?.id}`)
  }

  const onAction = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, modalType: ModalType) => {
    e.stopPropagation()
    onOpen(modalType, { server, channel })
  }

  return (
    <button
      className={cn(
        "group px-2 py-1.5 rounded-md flex items-center gap-x-1 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 mb-1",
        params?.channelId === channel?.id &&
          "bg-zinc-500/20 dark:bg-zinc-600/40 hover:bg-zinc-500/20 dark:hover:bg-zinc-600/40"
      )}
      onClick={onClick}>
      <Icon className="size-5 shrink-0 text-main" />
      <p
        className={cn(
          "line-clamp-1 text-main group-hover:text-main-hover text-sm font-medium transition",
          params?.channelId === channel?.id && "text-primary group-hover:text-primary dark:group-hover:text-primary font-semibold"
        )}>
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="flex items-center ml-auto gap-x-1.5">
          <ActionTooltip label="Edit Channel" side="top">
            <Settings
              className="hidden transition group-hover:block size-4 text-main group-hover:text-main-hover"
              onClick={(e) => onAction(e, "editChannel")}
            />
          </ActionTooltip>
          <ActionTooltip label="Delete Channel" side="top">
            <Trash
              className="hidden transition group-hover:block size-4 text-main group-hover:text-main-hover"
              onClick={(e) => onAction(e, "deleteChannel")}
            />
          </ActionTooltip>
        </div>
      )}
    </button>
  )
}
export default ServerChannel
