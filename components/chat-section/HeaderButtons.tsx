"use client"

import ActionTooltip from "@/components/ActionTooltip"
import { useMemberSidebar } from "@/hooks/useMemberSidebar"
import { cn } from "@/lib/utils"
import { UsersRound } from "lucide-react"

const HeaderButtons = () => {
  const { toggle, isOpen } = useMemberSidebar()

  return (
    <button onClick={() => toggle()}>
      <ActionTooltip label={isOpen ? "Hide Member List" : "Show Member List"} side="bottom">
        <UsersRound className={cn("mr-4 size-5 text-main hover:text-main-hover", { "text-primary": isOpen })} />
      </ActionTooltip>
    </button>
  )
}
export default HeaderButtons
