"use client"

import Image from "next/image"
import { useState, memo } from "react"
import { format } from "date-fns"
import { Member, MemberRole, Profile, Server } from "@prisma/client"
import UserAvatar from "@/components/UserAvatar"
import ActionTooltip from "@/components/ActionTooltip"
import MessageEdit from "@/components/chat-section/MessageEdit"
import MemberProfileCard from "@/components/chat-section/MemberProfileCard"
import { useModal } from "@/hooks/useModalStore"
import { cn } from "@/lib/utils"
import { Edit, FileIcon, ShieldCheck, ShieldEllipsisIcon, Trash } from "lucide-react"

interface MessageCardProps {
  id: string
  content: string
  member: Member & {
    profile: Profile
  }
  server: Server
  timestamp: Date
  fileUrl: string | null
  deleted: boolean
  currentMember: Member
  isUpdated: boolean
  socketUrl: string
  socketQuery: Record<string, string>
}

const mapIconByRole = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="size-3.5 text-theme-foreground" />,
  [MemberRole.ADMIN]: <ShieldEllipsisIcon className="size-3.5 text-theme-secondary" />,
}

const MessageCard = ({
  id,
  content,
  member,
  server,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: MessageCardProps) => {
  const fileType = fileUrl?.split(".").pop() //pdf or image
  const formattedTimestamp = format(new Date(timestamp), "d MMM yyyy, HH:mm")

  const [isEditing, setIsEditing] = useState(false)
  const { onOpen } = useModal()

  const isAdmin = currentMember.role === MemberRole.ADMIN
  const isModerator = currentMember.role === MemberRole.MODERATOR
  const isOwner = currentMember.id === member.id
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner)
  const canEditMessage = !deleted && isOwner && !fileUrl
  const isPDF = !!fileUrl && fileType === "pdf"
  const isImage = !!fileUrl && !isPDF

  return (
    <div className="relative flex w-full p-4 transition group hover:bg-zinc-200/20 dark:hover:bg-zinc-900/15">
      <div className="flex items-start w-full group gap-x-2">
        <div className="transition cursor-pointer hover:drop-shadow-sm">
          <MemberProfileCard server={server} member={member} currentMemberId={currentMember.id} side="right">
            <UserAvatar src={member.profile.imageUrl} />
          </MemberProfileCard>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-wrap items-center gap-x-2">
            <div className="flex items-center gap-x-1">
              <MemberProfileCard server={server} member={member} currentMemberId={currentMember.id}  side="top">
                <p className="text-sm font-semibold cursor-pointer hover:underline">{member.profile.name}</p>
              </MemberProfileCard>
              <ActionTooltip label={member.role} side="top">
                {mapIconByRole[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-[11px] text-main">{formattedTimestamp}</span>
          </div>
          <MediaSection fileUrl={fileUrl} isImage={isImage} isPDF={isPDF} />
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}>
              {content}
              {isUpdated && !deleted && (
                <span className="mx-2 text-[10px] text-zinc-500 dark:text-zinc-400">(edited)</span>
              )}
            </p>
          )}
          <MessageEdit
            content={content}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            deleted={deleted}
            id={id}
            socketUrl={socketUrl}
            socketQuery={socketQuery}
          />
        </div>
      </div>
      {canDeleteMessage && (
        <div className="absolute items-center hidden px-1.5 py-1 bg-white border rounded-sm group-hover:flex gap-x-2 -top-2 right-5 dark:bg-zinc-800">
          {canEditMessage && (
            <ActionTooltip label="Edit" side="top">
              <Edit
                onClick={() => setIsEditing(true)}
                className="ml-auto transition cursor-pointer size-[18px] text-main hover:text-main-hover"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete" side="top">
            <Trash
              onClick={() => onOpen("deleteMessage", { apiUrl: `${socketUrl}/${id}`, query: socketQuery })}
              className="ml-auto transition cursor-pointer size-[18px] text-main hover:text-main-hover"
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  )
}

export default memo(MessageCard)

const MediaSection = ({ fileUrl, isImage, isPDF }: { fileUrl: string | null; isImage?: boolean; isPDF?: boolean }) => {
  if (!fileUrl) return

  if (isImage)
    return (
      <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="relative block h-48 mt-2 sm:h-64 max-w-96">
        <Image
          fill
          src={fileUrl}
          alt="message-media"
          className="object-cover object-center rounded-md"
          sizes="(max-width:768px):50vw,100vw"
        />
      </a>
    )
  if (isPDF)
    return (
      <div className="relative flex flex-col items-center justify-center h-40 mt-2 rounded-md max-w-96 bg-main/10">
        <FileIcon className="text-gray-300 size-20 fill-theme-secondary" />
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block ml-2 text-sm text-center truncate text-theme-foreground hover:underline">
          PDF File
        </a>
      </div>
    )
}
