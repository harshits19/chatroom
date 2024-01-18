"use client"

import { MemberRole } from "@prisma/client"
import UserAvatar from "@/components/UserAvatar"
import { ShieldCheck, ShieldEllipsisIcon } from "lucide-react"

interface MemberCardProps {
  name: string
  imageUrl: string
  role: MemberRole
  status: string
}

const MemberCard = ({ name, imageUrl, role, status }: MemberCardProps) => {
  const mapIconByRole = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="size-3.5 text-theme-foreground" />,
    [MemberRole.ADMIN]: <ShieldEllipsisIcon className="size-3.5 text-theme-secondary" />,
  }

  return (
    <div
      className="px-2 py-1.5 flex cursor-pointer text-main hover:text-main-hover hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition-colors rounded-md gap-x-2"
      onClick={() => {}}>
      <UserAvatar src={imageUrl} className="size-8 md:size-8" />
      <div className="flex flex-col justify-center items-start">
        <p className="flex items-center text-[14px] font-semibold leading-4 gap-x-2">
          {name}
          {mapIconByRole[role]}
        </p>
        {status !== "" ? (
          <p className="text-xs truncate max-w-40" title={status}>
            {status}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export default MemberCard
