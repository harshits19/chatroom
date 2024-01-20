"use client"

import { useEffect, useState } from "react"
import { MemberRole } from "@prisma/client"
import { ScrollArea } from "@/components/ui/scroll-area"
import MemberCard from "@/components/chat-section/MemberCard"
import MemberProfileCard from "@/components/chat-section/MemberProfileCard"
import { useMemberSidebar } from "@/hooks/useMemberSidebar"
import { cn } from "@/lib/utils"
import { ServerWithMembersWithProfiles } from "@/types"

const MemberSidebar = ({
  server,
  currentMemberId,
}: {
  server: ServerWithMembersWithProfiles
  currentMemberId: string
}) => {
  const members = server?.members
  const admins = members.filter((member) => member.role === MemberRole.ADMIN)
  const moderators = members.filter((member) => member.role === MemberRole.MODERATOR)
  const guests = members.filter((member) => member.role === MemberRole.GUEST)

  const [isMobile, setIsMobile] = useState(false)

  const { isOpen, setClose } = useMemberSidebar()

  useEffect(() => {
    let isMediumDevice = true
    if (typeof window !== "undefined") isMediumDevice = window.innerWidth <= 1024
    if (isMediumDevice) {
      setClose()
      setIsMobile(true)
    }
  }, [])

  return (
    <div className={cn("flex-col shrink-0 h-full w-60 bg-[#F2F3F5] dark:bg-[#2B2D31] hidden", { flex: isOpen })}>
      <ScrollArea className="px-2 pb-4 h-[calc(100vh-3rem)]">
        {admins?.length > 0 ? (
          <p className="pt-4 pb-1 pl-2 text-xs font-semibold uppercase text-main">Admins - {admins?.length}</p>
        ) : null}
        {admins.map((member) => {
          return (
            <MemberProfileCard
              member={member}
              server={server}
              key={member.id}
              currentMemberId={currentMemberId}
              side={isMobile ? "bottom" : "right"}>
              <MemberCard
                name={member.profile.name}
                imageUrl={member.profile.imageUrl}
                role={member.role}
                status={member.profile.status}
              />
            </MemberProfileCard>
          )
        })}
        {moderators?.length > 0 ? (
          <p className="pt-4 pb-1 pl-2 text-xs font-semibold uppercase text-main">Moderators - {moderators?.length}</p>
        ) : null}
        {moderators.map((member) => {
          return (
            <MemberProfileCard
              member={member}
              server={server}
              key={member.id}
              currentMemberId={currentMemberId}
              side={isMobile ? "bottom" : "right"}>
              <MemberCard
                key={member.id}
                name={member.profile.name}
                imageUrl={member.profile.imageUrl}
                role={member.role}
                status={member.profile.status}
              />
            </MemberProfileCard>
          )
        })}
        {guests?.length > 0 ? (
          <p className="pt-4 pb-1 pl-2 text-xs font-semibold uppercase text-main">Guests - {guests?.length}</p>
        ) : null}
        {guests?.map((member) => {
          return (
            <MemberProfileCard
              member={member}
              server={server}
              key={member.id}
              currentMemberId={currentMemberId}
              side={isMobile ? "bottom" : "right"}>
              <MemberCard
                key={member.id}
                name={member.profile.name}
                imageUrl={member.profile.imageUrl}
                role={member.role}
                status={member.profile.status}
              />
            </MemberProfileCard>
          )
        })}
      </ScrollArea>
    </div>
  )
}
export default MemberSidebar
