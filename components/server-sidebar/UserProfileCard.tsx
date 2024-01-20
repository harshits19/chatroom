"use client"

import { memo } from "react"
import { SignOutButton } from "@clerk/nextjs"
import { Profile } from "@prisma/client"
import UserAvatar from "@/components/UserAvatar"
import ActionTooltip from "@/components/ActionTooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useModal } from "@/hooks/useModalStore"
import { SettingsIcon } from "lucide-react"

const UserProfileCard = ({ profile }: { profile: Profile }) => {
  const { onOpen } = useModal()
  return (
    <div className="h-[54px] bg-[#EBEDEF] dark:bg-[#232428] w-full px-1 py-0.5 flex items-center">
      <UserActions profile={profile}>
        <div className="flex items-center py-1 pl-1 pr-6 rounded-sm cursor-pointer group gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
          <div className="relative">
            <UserAvatar src={profile.imageUrl} className="size-[32px] md:size-[32px]" />
            <div className="absolute right-[-1px] w-3.5 h-3.5 border-[3.1px] border-[#EBEDEF] dark:border-[#232428] group-hover:border-[#d9dbde] dark:group-hover:border-[#313237] rounded-full -bottom-0.5 bg-theme-secondary" />
          </div>
          <div className="flex flex-col w-full max-w-32 items-start">
            <p className="text-[12px] truncate">{profile.name}</p>
            <p className="text-[10px]">Online</p>
          </div>
        </div>
      </UserActions>
      <button className="ml-auto" onClick={() => onOpen("editProfile", { profile })}>
        <ActionTooltip className="text-xs" label="User Settings" side="top">
          <SettingsIcon className="p-1.5 rounded-md size-8 text-main hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50" />
        </ActionTooltip>
      </button>
    </div>
  )
}
export default memo(UserProfileCard)

const UserActions = ({ children, profile }: { children: React.ReactNode; profile: Profile }) => {
  const { onOpen } = useModal()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem className="cursor-pointer" onClick={() => onOpen("editProfile", { profile })}>Edit Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
