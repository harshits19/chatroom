"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Member, Profile, Server } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { useMounted } from "@/hooks/useMounted"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const AcceptInviteModal = ({ server }: { server: Server & { profile: Profile; members: Member[] } }) => {
  const router = useRouter()
  const isMounted = useMounted()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const response = await axios.patch(`/api/invite/${server.id}`)
      const serverId = response.data?.id
      setIsLoading(false)
      setIsSuccess(true)
      router.push(`/servers/${serverId}`)
      router.refresh()
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  if (!isMounted) return null
  return (
    <Dialog open>
      <DialogContent className="overflow-hidden bg-theme nofocus">
        <DialogHeader className="flex flex-col items-center justify-center">
          <div className="relative rounded-full size-16 bg-muted">
            {server?.imageUrl && (
              <Image src={server?.imageUrl} className="object-cover object-center rounded-full" fill alt="server-pfp" />
            )}
          </div>
          <p className="mt-1 text-sm text-accent-foreground">{server?.profile?.name ?? "Admin"} invited you to join</p>
          <p className="mt-2 text-2xl font-semibold capitalize">{server?.name}</p>
          <div className="flex items-center mt-2 text-xs gap-x-1 text-accent-foreground">
            <div className="bg-gray-500 size-3 rounded-2xl" />
            {server?.members?.length}
            {server?.members?.length > 1 ? " Members" : " Member"}
          </div>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            disabled={isLoading}
            variant="primary"
            className={cn("w-full no-focus", { "bg-theme-secondary hover:bg-theme-secondary/90": isSuccess })}
            onClick={onClick}>
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : isSuccess ? "Accepted" : "Accept Invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default AcceptInviteModal
