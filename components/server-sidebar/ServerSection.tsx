"use client"

import { ChannelType, MemberRole } from "@prisma/client"
import ActionTooltip from "@/components/ActionTooltip"
import { useModal } from "@/hooks/useModalStore"
import { PlusIcon } from "lucide-react"
import { ServerWithMembersWithProfiles } from "@/types"

interface ServerSectionProps {
  label: string
  role?: MemberRole
  sectionType: "channels" | "members"
  channelType?: ChannelType
  server?: ServerWithMembersWithProfiles
}

const ServerSection = ({ label, role, sectionType, channelType, server }: ServerSectionProps) => {
  const { onOpen } = useModal()
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase cursor-default text-main hover:text-main-hover">{label}</p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            className="text-main hover:text-main-hover"
            onClick={() => onOpen("createChannel", { server, channelType })}>
            <PlusIcon className="size-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  )
}
export default ServerSection
