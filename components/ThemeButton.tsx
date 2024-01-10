"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ActionTooltip from "@/components/ActionTooltip"
import { CheckIcon, Moon, Sun } from "lucide-react"

const ThemeButton = () => {
  const { setTheme, theme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <ActionTooltip label="Change appearance">
            <button className="group flex items-center">
              <div className="flex mx-3 size-12 group-hover:rounded-2xl transition-all bg-background rounded-3xl overflow-hidden items-center justify-center group-hover:bg-theme-secondary dark:bg-neutral-700">
                <Sun
                  className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:text-white text-theme-secondary"
                  size={24}
                />
                <Moon
                  className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:text-white text-theme-secondary"
                  size={24}
                />
                <span className="sr-only">Toggle theme</span>
              </div>
            </button>
          </ActionTooltip>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-x-1">
          <span className="w-4 h-4">{theme === "light" ? <CheckIcon className="w-4 h-4" /> : null}</span>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-x-1">
          <span className="w-4 h-4">{theme === "dark" ? <CheckIcon className="w-4 h-4" /> : null}</span>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-x-1">
          <span className="w-4 h-4">{theme === "system" ? <CheckIcon className="w-4 h-4" /> : null}</span>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default ThemeButton
