"use client"

import { useParams, useRouter } from "next/navigation"
import { Channel, MemberRole, Server } from "@prisma/client"
import ActionTooltip from "@/components/ActionTooltip"
import { useModal } from "@/hooks/useModalStore"
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

  return (
    <button
      className={cn(
        "group px-2 py-1.5 rounded-md flex items-center gap-x-1 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 mb-1",
        params?.channedId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
      onClick={() => {}}>
      <Icon className="size-5 shrink-0 text-main" />
      <p
        className={cn(
          "line-clamp-1 text-main group-hover:text-main-hover text-sm font-medium transition",
          params?.channedId === channel.id && "text-primary font-semibold"
        )}>
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="flex items-center ml-auto gap-x-1.5">
          <ActionTooltip label="Edit Channel" side="top">
            <Settings
              className="hidden transition group-hover:block size-4 text-main group-hover:text-main-hover"
              onClick={() => onOpen("editChannel", { channel, server })}
            />
          </ActionTooltip>
          <ActionTooltip label="Delete Channel" side="top">
            <Trash
              className="hidden transition group-hover:block size-4 text-main group-hover:text-main-hover"
              onClick={() => onOpen("deleteChannel", { channel, server })}
            />
          </ActionTooltip>
        </div>
      )}
    </button>
  )
}
export default ServerChannel
