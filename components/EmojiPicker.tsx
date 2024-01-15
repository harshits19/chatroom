"use client"

import { useTheme } from "next-themes"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMounted } from "@/hooks/useMounted"
import { cn } from "@/lib/utils"
import { Smile } from "lucide-react"

interface EmojiPickerProps {
  onChange: (value: string) => void
  className?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "center" | "start" | "end"
}

const EmojiPicker = ({ onChange, className, side = "top", align = "end" }: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme()
  const isMounted = useMounted()
  if (!isMounted) return null
  return (
    <Popover>
      <PopoverTrigger>
        <Smile
          className={cn("rounded-full size-6 text-primary-foreground/85 bg-primary/70 hover:bg-primary/85", className)}
        />
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        className="w-full bg-transparent border-none shadow-none drop-shadow-none">
        <Picker
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          previewPosition="none"
          searchPosition="none"
          maxFrequentRows="0"
        />
      </PopoverContent>
    </Popover>
  )
}
export default EmojiPicker
