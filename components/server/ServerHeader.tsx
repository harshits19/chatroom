"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MemberRole } from "@prisma/client"
import { ChevronDown, LogOut, PlusCircle, SettingsIcon, TrashIcon, UserCircle2, UserPlus2 } from "lucide-react"
import { ServerWithMembersWithProfiles } from "@/types"
import { useModal } from "@/hooks/useModalStore"

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles
  role?: MemberRole
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal()
  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="flex items-center justify-between w-full h-12 px-4 font-semibold capitalize transition border-b-2 text-primary border-neutral-200 dark:border-neutral-800 hover:bg-zinc-700/5 dark:hover:bg-zinc-700/50">
          {server.name} <ChevronDown className="size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-accent-foreground space-y-0.5">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="px-3 py-2 text-sm text-indigo-400 cursor-pointer focus:text-white focus:bg-theme-foreground">
            Invite People <UserPlus2 className="ml-auto size-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="px-3 py-2 text-sm cursor-pointer focus:bg-theme-foreground focus:text-white">
            Server Settings <SettingsIcon className="ml-auto size-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer focus:bg-theme-foreground focus:text-white">
            Manage Members <UserCircle2 className="ml-auto size-4" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer focus:bg-theme-foreground focus:text-white">
            Create Channel <PlusCircle className="ml-auto size-4" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm text-red-500 cursor-pointer focus:bg-destructive focus:text-white">
            Delete Server <TrashIcon className="ml-auto size-4" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm text-red-500 cursor-pointer focus:bg-destructive focus:text-white">
            Leave Server <LogOut className="ml-auto size-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default ServerHeader
