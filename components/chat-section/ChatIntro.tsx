import { Hash } from "lucide-react"

interface ChatIntroProps {
  name: string
  type: "channel" | "conversation"
}
const ChatIntro = ({ name, type }: ChatIntroProps) => {
  return (
    <div className="px-4 mb-4 space-y-2">
      {type === "channel" && (
        <div className="p-2 w-min rounded-full bg-[#6d6f78] dark:bg-[#41434a]">
          <Hash className="size-12 text-white/90" />
        </div>
      )}
      <p className="text-xl font-bold md:text-3xl">
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </p>
      <p className="text-sm text-main">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is start of your conversation with ${name}`}
      </p>
    </div>
  )
}
export default ChatIntro
