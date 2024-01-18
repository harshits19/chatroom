"use client"

import { useState } from "react"
import axios from "axios"
import qs from "query-string"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModalStore"

const DeleteMessageModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onClose, type, data } = useModal()
  const { apiUrl, query } = data

  const isModalOpen = isOpen && type === "deleteMessage"

  const onClick = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query: query,
      })
      await axios.delete(url)
      setIsLoading(false)
      onClose()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden bg-theme">
        <DialogTitle className="px-4 pt-4 text-lg font-semibold">Delete Message</DialogTitle>
        <DialogDescription className="p-4">
          Are you sure you want to delete this message? This cannot be undone.
        </DialogDescription>
        <DialogFooter className="px-6 py-4 bg-muted gap-y-1">
          <DialogClose asChild className="no-focus">
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onClick} disabled={isLoading}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteMessageModal
