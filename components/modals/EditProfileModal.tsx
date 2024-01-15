"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import qs from "query-string"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FileUpload from "@/components/FileUpload"
import { useModal } from "@/hooks/useModalStore"
import EmojiPicker from "../EmojiPicker"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
  status: z.string().max(100),
})

const EditProfileModal = () => {
  const router = useRouter()
  const { isOpen, onClose, type, data } = useModal()
  const isModalOpen = isOpen && type === "editProfile"
  const { profile } = data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      status: "",
    },
  })

  useEffect(() => {
    if (profile) {
      form.setValue("name", profile.name)
      form.setValue("imageUrl", profile.imageUrl)
      form.setValue("status", profile.status)
    }
  }, [profile, isOpen])

  const isSubmitting = form.formState.isSubmitting
  const isValid = form.formState.isValid

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/profile",
        query: {
          profileId: profile?.id,
        },
      })
      await axios.patch(url, values)
      onClose()
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden bg-theme">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">Update your Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="px-6 space-y-4">
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
                    <FormLabel className="text-xs font-bold uppercase text-accent-foreground">Name</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} className="no-focus" placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-accent-foreground">Status</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isSubmitting}
                          className="no-focus"
                          placeholder={`What's cooking ${profile?.name}?`}
                          {...field}
                        />
                        <div className="absolute top-2 right-2">
                          <EmojiPicker
                            onChange={(emoji: string) => field.onChange(`${field.value}${emoji}`)}
                            side="bottom"
                            align="end"
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4 bg-muted">
              <Button disabled={!isValid || isSubmitting} variant="primary">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal
