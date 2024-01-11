"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Profile, Server } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { useMounted } from "@/hooks/useMounted"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const AcceptInviteModal = ({ server }: { server: Server & { profile: Profile } }) => {
  const router = useRouter()
  const isMounted = useMounted()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const response = await axios.patch(`/api/invite/${server.id}`)
      const serverId = response.data?.id
      setIsLoading(false)
      if (serverId) {
        setIsSuccess(true)
        router.push(`/servers/${serverId}`)
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!isMounted) return null
  return (
    <Dialog open>
      <DialogContent className="overflow-hidden bg-theme">
        <DialogHeader className="flex flex-col items-center justify-center">
          <div className="relative rounded-full size-20 bg-muted">
            {server?.imageUrl && (
              <Image src={server?.imageUrl} className="object-cover object-center rounded-full" fill alt="server-pfp" />
            )}
          </div>
          <p className="mt-1 text-sm text-accent-foreground">{server?.profile?.name ?? "Admin"} invited you to join</p>
          <p className="mt-2 text-2xl font-semibold">{server?.name}</p>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isLoading}
            variant="primary"
            className={cn("w-full", { "bg-theme-secondary": isSuccess })}
            onClick={onClick}>
            {isLoading ? <Loader2 className="size-4 animate-spin mr-1.5" /> : isSuccess ? "Accepted" : "Accept Invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default AcceptInviteModal
