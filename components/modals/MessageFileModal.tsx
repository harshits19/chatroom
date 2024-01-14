"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import qs from "query-string"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormMessage, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import FileUpload from "@/components/FileUpload"
import { useModal } from "@/hooks/useModalStore"

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Atleast one file is required.",
  }),
})

const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const { apiUrl, query } = data
  const isModalOpen = isOpen && type === "messageFile"

  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    },
  })

  const isSubmitting = form.formState.isSubmitting
  const isValid = form.formState.isValid

  const handleClose = () => {
    form.reset()
    onClose()
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      })
      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      })
      router.refresh()
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden bg-theme nofocus">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">Add an attachment</DialogTitle>
          <DialogDescription className="text-center text-accent-foreground">
            Send a file or an image as a message.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="px-6 space-y-8">
              <div className="flex items-center justify-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload endpoint="messageFile" value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="px-6 py-4 bg-muted">
              <Button disabled={!isValid || isSubmitting} variant="primary">
                Upload
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default MessageFileModal
