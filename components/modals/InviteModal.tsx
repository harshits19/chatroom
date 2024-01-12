"use client"

import { useState } from "react"
import axios from "axios"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useOrigin } from "@/hooks/useOrigin"
import { useModal } from "@/hooks/useModalStore"
import { cn } from "@/lib/utils"
import { Check, Copy, RefreshCwIcon } from "lucide-react"

const InviteModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal()
  const origin = useOrigin()
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`
  
  const isModalOpen = isOpen && type === "invite"

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  const getNewInviteUrl = async () => {
    try {
      setIsLoading(true)
      const response = await axios.patch(`/api/servers/${data.server?.id}/invitecode`)
      setIsLoading(false)
      onOpen("invite", { server: response.data })
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden bg-theme">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">Invite Friends</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-accent-foreground">Server invite link</Label>
          <div className="flex items-center mt-2">
            <Input className="rounded-none rounded-l-md no-focus" value={inviteUrl} disabled={isLoading} />
            <Button
              variant="primary"
              disabled={isLoading}
              onClick={onCopy}
              size="icon"
              className="px-6 rounded-none rounded-r-md">
              {copied ? <Check className="size-4 shrink-0" /> : <Copy className="size-4 shrink-0" />}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={getNewInviteUrl}
            variant="link"
            size="sm"
            className="mt-4 text-xs text-accent-foreground">
            Generate a new link
            <RefreshCwIcon className={cn("ml-2 size-4", { "animate-spin": isLoading })} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InviteModal
