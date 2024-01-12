import { ChannelType, MemberRole } from "@prisma/client"
import { HashIcon, ShieldCheck, ShieldEllipsisIcon, VideoIcon, Volume2Icon } from "lucide-react"

export const mapIconByChannelType = {
  [ChannelType.TEXT]: HashIcon,
  [ChannelType.VIDEO]: VideoIcon,
  [ChannelType.AUDIO]: Volume2Icon,
}

export const mapIconByRole = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: ShieldCheck,
  [MemberRole.ADMIN]: ShieldEllipsisIcon,
}
