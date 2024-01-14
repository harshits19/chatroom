import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  src: string
  className?: string
}

const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("size-7 md:size-10 bg-zinc-300 dark:bg-zinc-700", className)}>
      <AvatarImage src={src} />
    </Avatar>
  )
}
export default UserAvatar
