"use client"

import { memo } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Member, Profile, Server } from "@prisma/client"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { useMounted } from "@/hooks/useMounted"

interface MemberProfileCardProps {
  children: React.ReactNode
  member: Member & { profile: Profile }
  server: Server
  side?: "left" | "top" | "right" | "bottom"
  align?: "center" | "start" | "end"
}

const MemberProfileCard = ({ children, member, server, side = "left", align = "center" }: MemberProfileCardProps) => {
  const router = useRouter()

  const isMounted = useMounted()
  if (!isMounted)
    return (
      <>
        <div className="flex items-center w-full px-2 py-1 gap-x-3">
          <Skeleton className="rounded-full size-7 bg-zinc-500/20 dark:bg-zinc-600/40 shrink-0" />
          <Skeleton className="flex-1 h-4 bg-zinc-500/20 dark:bg-zinc-600/40" />
        </div>
        <div className="flex items-center w-full px-2 py-1 gap-x-3">
          <Skeleton className="rounded-full size-7 bg-zinc-500/20 dark:bg-zinc-600/40 shrink-0" />
          <Skeleton className="flex-1 h-4 bg-zinc-500/20 dark:bg-zinc-600/40" />
        </div>
      </>
    )

  return (
    <Popover>
      <PopoverTrigger className="w-full">{children}</PopoverTrigger>
      <PopoverContent side={side} align={align} className="p-0 rounded-lg bg-[#EAECEE] dark:bg-popover">
        <div className="w-full relative rounded-t-lg h-[60px] bg-theme-foreground border-none">
          <div className="absolute left-4 top-4">
            <div className="relative border-[6px] rounded-full size-20 border-popover">
              <Image
                src={member.profile.imageUrl}
                alt="user-pfp"
                fill
                quality={30}
                className="object-cover object-center rounded-full bg-muted"
              />
            </div>
          </div>
        </div>
        <div className="h-full px-4 pb-4 pt-14">
          <div className="dark:bg-[#111214] bg-white rounded-lg h-full p-3">
            <div className="text-base font-semibold">{member.profile.name}</div>
            {member.profile.status && <div className="text-xs font-medium text-main">{member.profile.status}</div>}
            <div className="w-full h-px my-3 rounded bg-zinc-300 dark:bg-zinc-700" />
            <h4 className="text-xs font-bold uppercase text-primary dark:text-primary/70">Member Since</h4>
            <div className="flex items-center text-xs font-medium text-primary/90 gap-x-2">
              <div className="flex items-center py-2 gap-x-2">
                <Image src="/ico1.png" height={16} width={16} sizes="100vw" alt="chatroom" className="rounded-full" />
                <span>{format(member.createdAt, "MMM dd, yyyy")}</span>
              </div>
              <div className="rounded-full size-1 bg-zinc-500 dark:bg-zinc-700" />
              <div className="flex items-center gap-x-2">
                {server.imageUrl ? (
                  <Image
                    src={server.imageUrl}
                    height={16}
                    width={16}
                    sizes="100vw"
                    alt="server-img"
                    className="rounded-full"
                  />
                ) : (
                  <span className="rounded-full size-4 bg-zinc-400 dark:bg-zinc-800 text-main text-[10px] flex items-center justify-center">
                    S
                  </span>
                )}
                <span>{format(member.profile.createdAt, "MMM dd, yyyy")}</span>
              </div>
            </div>
            {server.profileId !== member.profileId && (
              <div className="pt-4">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => router.push(`/servers/${server.id}/conversations/${member.id}`)}>
                  Message
                </Button>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
export default memo(MemberProfileCard)
