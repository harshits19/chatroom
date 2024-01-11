"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Member, MemberRole } from "@prisma/client"
import qs from "query-string"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import UserAvatar from "@/components/UserAvatar"
import { useModal } from "@/hooks/useModalStore"
import { ShieldCheck, ShieldEllipsis, MoreVertical, ShieldQuestion, Shield, Check, Gavel, Loader2 } from "lucide-react"
import { ServerWithMembersWithProfiles } from "@/types"

const mapIconByRole = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="size-4 text-theme-foreground" />,
  ADMIN: <ShieldEllipsis className="size-4 text-theme-secondary" />,
}

const MembersModal = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose, type, data } = useModal()
  const { server } = data as { server: ServerWithMembersWithProfiles }

  const [loadingId, setLoadingId] = useState("")

  const isModalOpen = isOpen && type === "members"

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
          memberId,
        },
      })
      const response = await axios.patch(url, { role })
      router.refresh()
      setLoadingId("")
      onOpen("members", { server: response.data })
    } catch (error) {
      console.log(error)
      setLoadingId("")
    }
  }

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
          memberId,
        },
      })
      const response = await axios.delete(url)
      router.refresh()
      setLoadingId("")
      onOpen("members", { server: response.data })
    } catch (error) {
      console.log(error)
      setLoadingId("")
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-theme">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">Manage Members</DialogTitle>
          <DialogDescription className="text-center text-accent-foreground">
            {server?.members?.length} {server?.members?.length > 1 ? " Members" : " Member"}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px]">
          {server?.members?.map((member) => (
            <div className="flex items-center px-4 py-2 rounded-md gap-x-2 hover:bg-accent" key={member.id}>
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center text-xs font-semibold gap-x-2">
                  {member.profile.name}
                  {mapIconByRole[member.role]}
                </div>
                <p className="text-xs text-accent-foreground">{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId && loadingId !== member.id && (
                <div className="ml-auto text-xs">
                  <Menu member={member} onRoleChange={onRoleChange} onKick={onKick} />
                </div>
              )}
              {loadingId === member.id && <Loader2 className="ml-auto size-4 animate-spin text-accent-foreground" />}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

const Menu = ({
  member,
  onRoleChange,
  onKick,
}: {
  member: Member
  onRoleChange: (memberId: string, role: MemberRole) => Promise<void>
  onKick: (memberId: string) => Promise<void>
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-0 focus-visible:ring-offset-0">
        <MoreVertical className="p-1 size-6 rounded-3xl text-accent-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center">
            <ShieldQuestion className="mr-2 size-4" />
            <span>Role</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="flex items-center"
                onClick={() => {
                  member.role === "MODERATOR" && onRoleChange(member.id, "GUEST")
                }}>
                <Shield className="mr-2 size-4" />
                Guest
                {member.role === "GUEST" && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center"
                onClick={() => {
                  member.role === "GUEST" && onRoleChange(member.id, "MODERATOR")
                }}>
                <ShieldCheck className="mr-2 size-4" />
                Moderator
                {member.role === "MODERATOR" && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:text-white focus:bg-destructive"
          onClick={() => onKick(member.id)}>
          <Gavel className="mr-2 size-4" />
          Kick
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MembersModal
