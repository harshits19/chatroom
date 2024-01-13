"use client"

import ActionTooltip from "@/components/ActionTooltip"
import { useModal } from "@/hooks/useModalStore"
import { Plus } from "lucide-react"

const SidebarActions = () => {
  const { onOpen } = useModal()
  return (
    <div>
      <ActionTooltip label="Add a server">
        <button onClick={() => onOpen("createServer")} className="flex items-center group">
          <div className="flex items-center justify-center mx-3 overflow-hidden transition-all size-12 group-hover:rounded-2xl bg-background rounded-3xl group-hover:bg-theme-secondary dark:bg-neutral-700">
            <Plus className="transition group-hover:text-white text-theme-secondary" size={25} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
export default SidebarActions
