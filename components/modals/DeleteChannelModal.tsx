"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import qs from "query-string"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModalStore"

const DeleteChannelModal = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onClose, type, data } = useModal()
  const { channel, server } = data

  const isModalOpen = isOpen && type === "deleteChannel"

  const onClick = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      })
      await axios.delete(url)
      setIsLoading(false)
      onClose()
      router.push(`/servers/${server?.id}`)
      router.refresh()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden bg-theme">
        <DialogTitle className="px-4 pt-4 text-lg font-semibold">Delete Channel</DialogTitle>
        <DialogDescription className="p-4">
          Are you sure you want to delete <span className="font-semibold text-primary">#{channel?.name}</span>? This
          cannot be undone.
        </DialogDescription>
        <DialogFooter className="px-6 py-4 bg-muted gap-y-1">
          <DialogClose asChild className="no-focus">
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onClick} disabled={isLoading}>
            Delete Channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteChannelModal
