import { Separator } from "@/components/ui/separator"
import MobileToggle from "@/components/chat-section/MobileToggle"
import { HashIcon } from "lucide-react"

interface ChatHeaderProps {
  serverId: string
  name: string
  type: "channel" | "conversation"
  imageUrl?: string
  description?: string
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="flex items-center h-12 px-3 border-b-2 border-neutral-200 dark:border-neutral-800">
      <MobileToggle serverId={serverId} />
      {type === "channel" && <HashIcon className="mx-1.5 size-6 text-main" />}
      <p className="text-sm font-semibold">{name}</p>
      <Separator className="h-6 mx-4 w-0.5 bg-zinc-300 dark:bg-zinc-700" orientation="vertical" />
      <p className="text-[13px] font-semibold text-main">description</p>
    </div>
  )
}
export default ChatHeader
