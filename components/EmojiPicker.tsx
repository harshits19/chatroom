"use client"

import { useTheme } from "next-themes"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMounted } from "@/hooks/useMounted"
import { Smile } from "lucide-react"

interface EmojiPickerProps {
  onChange: (value: string) => void
}

const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme()
  const isMounted = useMounted()
  if (!isMounted) return null
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="rounded-full size-6 text-primary-foreground/85 bg-primary/70 hover:bg-primary/85" />
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="bg-transparent border-none shadow-none drop-shadow-none">
        <Picker theme={resolvedTheme} data={data} onEmojiSelect={(emoji: any) => onChange(emoji.native)} />
      </PopoverContent>
    </Popover>
  )
}
export default EmojiPicker
