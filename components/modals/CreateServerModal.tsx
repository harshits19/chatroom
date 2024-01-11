"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FileUpload from "@/components/FileUpload"
import { useModal } from "@/hooks/useModalStore"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
})

const CreateServerModal = () => {
  const router = useRouter()
  const { isOpen, onClose, type } = useModal()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  })

  const isLoading = form.formState.isLoading

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const server = await axios.post("/api/servers", values)
      form.reset()
      onClose()
      router.push(`/servers/${server?.data?.id}`)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  const isModalOpen = isOpen && type === "createServer"
  const handleClose = () => {
    form.reset()
    onClose()
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-theme p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">Customize your server</DialogTitle>
          <DialogDescription className="text-center text-accent-foreground">
            Give your server a personality with a name and an image. You can always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload endpoint="serverImage" value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-accent-foreground">Server name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} className="no-focus" placeholder="Enter server name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-muted px-6 py-4">
              <Button disabled={isLoading} variant="primary">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateServerModal
