"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
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

const DeleteServerModal = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onClose, type, data } = useModal()
  const { server } = data

  const isModalOpen = isOpen && type === "deleteServer"

  const onClick = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/servers/${server?.id}`)
      setIsLoading(false)
      onClose()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden bg-theme">
        <DialogTitle className="px-4 pt-4 text-lg font-semibold">Delete &#39;{server?.name}&#39;</DialogTitle>
        <DialogDescription className="p-4">
          Are you sure you want to delete <span className="font-semibold text-primary">{server?.name}</span>? This
          action cannot be undone.
        </DialogDescription>
        <DialogFooter className="px-6 py-4 bg-muted gap-y-1">
          <DialogClose asChild className="no-focus">
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onClick} disabled={isLoading}>
            Delete Server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteServerModal
