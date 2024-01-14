import { Profile } from "@prisma/client"
import UserAvatar from "@/components/UserAvatar"
import ActionTooltip from "@/components/ActionTooltip"
import { SettingsIcon } from "lucide-react"

const UserProfileCard = ({ profile }: { profile: Profile }) => {
  return (
    <div className="h-[54px] bg-[#EBEDEF] dark:bg-[#232428] w-full px-1 py-0.5 flex items-center">
      <div className="flex items-center py-1 pl-1 pr-4 rounded-sm cursor-pointer group gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
        <div className="relative">
          <UserAvatar src={profile.imageUrl} className="size-[32px] md:size-[32px]" />
          <div className="absolute right-[-1px] w-3.5 h-3.5 border-[3.1px] border-[#EBEDEF] dark:border-[#232428] group-hover:border-[#d9dbde] dark:group-hover:border-[#313237] rounded-full -bottom-0.5 bg-theme-secondary"></div>
        </div>
        <div className="flex flex-col">
          <p className="text-[12px] truncate">{profile.name}</p>
          <p className="text-[10px]">Online</p>
        </div>
      </div>
      <button className="ml-auto">
        <ActionTooltip className="text-xs" label="User Settings" side="top">
          <SettingsIcon className="p-1.5 rounded-md size-8 text-main hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50" />
        </ActionTooltip>
      </button>
    </div>
  )
}
export default UserProfileCard
