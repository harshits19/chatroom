"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MemberRole } from "@prisma/client"
import { ScrollArea } from "@/components/ui/scroll-area"
import UserAvatar from "@/components/UserAvatar"
import { ShieldCheck, ShieldEllipsisIcon } from "lucide-react"
import { ServerWithMembersWithProfiles } from "@/types"
import { useMemberSidebar } from "@/hooks/useMemberSidebar"
import { cn } from "@/lib/utils"

const MemberSidebar = ({ server }: { server: ServerWithMembersWithProfiles }) => {
  const members = server?.members
  const admins = members.filter((member) => member.role === MemberRole.ADMIN)
  const moderators = members.filter((member) => member.role === MemberRole.MODERATOR)
  const guests = members.filter((member) => member.role === MemberRole.GUEST)

  const { isOpen, setClose } = useMemberSidebar()

  useEffect(() => {
    let isMediumDevice = true
    if (typeof window !== "undefined") isMediumDevice = window.innerWidth <= 1024
    if (isMediumDevice) setClose()
  }, [])

  return (
    <div className={cn("flex-col shrink-0 h-full w-60 bg-[#F2F3F5] dark:bg-[#2B2D31] hidden", { flex: isOpen })}>
      <ScrollArea className="px-2 pb-4 h-[calc(100vh-3rem)]">
        {admins?.length > 0 ? (
          <p className="pt-4 pb-1 pl-2 text-xs font-semibold uppercase text-main">Admins - {admins?.length}</p>
        ) : null}
        {admins.map((member) => {
          return (
            <MemberCard
              key={member.id}
              name={member.profile.name}
              imageUrl={member.profile.imageUrl}
              role={member.role}
              status={member.profile.status}
              serverId={server.id}
              memberId={member.id}
            />
          )
        })}
        {moderators?.length > 0 ? (
          <p className="pt-4 pb-1 pl-2 text-xs font-semibold uppercase text-main">Moderators - {moderators?.length}</p>
        ) : null}
        {moderators.map((member) => {
          return (
            <MemberCard
              key={member.id}
              name={member.profile.name}
              imageUrl={member.profile.imageUrl}
              role={member.role}
              status={member.profile.status}
              serverId={server.id}
              memberId={member.id}
            />
          )
        })}
        {guests?.length > 0 ? (
          <p className="pt-4 pb-1 pl-2 text-xs font-semibold uppercase text-main">Guests - {guests?.length}</p>
        ) : null}
        {guests?.map((member) => {
          return (
            <MemberCard
              key={member.id}
              name={member.profile.name}
              imageUrl={member.profile.imageUrl}
              role={member.role}
              status={member.profile.status}
              serverId={server.id}
              memberId={member.id}
            />
          )
        })}
      </ScrollArea>
    </div>
  )
}
export default MemberSidebar

interface MemberCardProps {
  name: string
  imageUrl: string
  role: MemberRole
  status: string
  serverId: string
  memberId: string
}

const MemberCard = ({ name, imageUrl, role, status, serverId, memberId }: MemberCardProps) => {
  const router = useRouter()
  const mapIconByRole = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="size-3.5 text-theme-foreground" />,
    [MemberRole.ADMIN]: <ShieldEllipsisIcon className="size-3.5 text-theme-secondary" />,
  }

  return (
    <div
      className="px-2 py-1.5 flex cursor-pointer hover:text-main-hover hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition-colors rounded-md gap-x-2"
      onClick={() => router.push(`/servers/${serverId}/conversations/${memberId}`)}>
      <UserAvatar src={imageUrl} className="size-8 md:size-8" />
      <div className="flex flex-col justify-center">
        <p className="flex items-center text-sm font-semibold gap-x-2 text-main">
          {name}
          {mapIconByRole[role]}
        </p>
        {status !== "" ? <p className="text-xs">{status}</p> : null}
      </div>
    </div>
  )
}
