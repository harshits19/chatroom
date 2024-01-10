"use client"

import { Plus } from "lucide-react"
import ActionTooltip from "@/components/ActionTooltip"

const SidebarActions = () => {
  return (
    <div>
      <ActionTooltip label="Add a server" side="right" align="center">
        <button className="group flex items-center">
          <div className="flex mx-3 size-12 group-hover:rounded-2xl transition-all bg-background rounded-3xl overflow-hidden items-center justify-center group-hover:bg-theme-secondary dark:bg-neutral-700">
            <Plus className="group-hover:text-white transition text-theme-secondary" size={25} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
export default SidebarActions
