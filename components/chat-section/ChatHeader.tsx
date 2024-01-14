import MobileToggle from "@/components/chat-section/MobileToggle"
import HeaderButtons from "@/components/chat-section/HeaderButtons"
import UserAvatar from "@/components/UserAvatar"
import SocketIndicator from "@/components/SocketIndicator"
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
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {type === "conversation" && imageUrl && <UserAvatar src={imageUrl} className="mr-2 size-8 md:size-8" />}
          <p className="text-sm font-semibold">{name}</p>
        </div>
        {type === "channel" && <HeaderButtons />}
        {type === "conversation" && <SocketIndicator />}
      </div>
    </div>
  )
}
export default ChatHeader
