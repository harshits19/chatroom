import MobileToggle from "@/components/chat-section/MobileToggle"
import HeaderButtons from "@/components/chat-section/HeaderButtons"
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
    <div className="flex items-center h-12 px-3 border-b-2 border-neutral-200 dark:border-neutral-800 shrink-0">
      <MobileToggle serverId={serverId} />
      {type === "channel" && <HashIcon className="mx-1.5 size-6 text-main" />}
      <div className="flex justify-between w-full">
        <p className="text-sm font-semibold">{name}</p>
        <HeaderButtons />
      </div>
    </div>
  )
}
export default ChatHeader
