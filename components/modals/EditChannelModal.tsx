"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import qs from "query-string"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChannelType } from "@prisma/client"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModalStore"
import { Hash, VideoIcon, Volume2 } from "lucide-react"

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required.",
    })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general'",
    }),
  type: z.nativeEnum(ChannelType),
})

const EditChannelModal = () => {
  const router = useRouter()
  const { isOpen, onClose, type, data } = useModal()
  const { channel, server } = data
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channel?.type || ChannelType.TEXT,
    },
  })

  useEffect(() => {
    if (channel) {
      form.setValue("name", channel.name)
      form.setValue("type", channel.type)
    }
  }, [form, channel])

  const isValid = form.formState.isValid
  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      })
      await axios.patch(url, values)
      onClose()
      form.reset()
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  const isModalOpen = isOpen && type === "editChannel"
  const handleClose = () => {
    form.reset()
    onClose()
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden bg-theme">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">Edit channel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="px-6 space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-accent-foreground">Channel name</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} className="no-focus" placeholder="Enter channel name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-accent-foreground">Channel Type</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid">
                        <FormItem>
                          <FormLabel className="flex items-center px-4 py-3 rounded group gap-x-3 hover:bg-muted bg-accent dark:bg-background/50 dark:hover:bg-muted">
                            <Hash className="size-5 shrink-0 text-main group-hover:text-main-hover" />
                            <div className="flex flex-col flex-1 text-main group-hover:text-main-hover">
                              <div className="text-sm">Text</div>
                              <div className="text-xs">Send messages, images, emoji, opinions and puns</div>
                            </div>
                            <FormControl>
                              <RadioGroupItem value={ChannelType.TEXT} />
                            </FormControl>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="flex items-center px-4 py-3 rounded group gap-x-3 hover:bg-muted bg-accent dark:bg-background/50 dark:hover:bg-muted">
                            <Volume2 className="size-5 shrink-0 text-main group-hover:text-main-hover" />
                            <div className="flex flex-col flex-1 text-main group-hover:text-main-hover">
                              <div className="text-sm">Voice</div>
                              <div className="text-xs">Hang out together with voice messages</div>
                            </div>
                            <FormControl>
                              <RadioGroupItem value={ChannelType.AUDIO} />
                            </FormControl>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="flex items-center px-4 py-3 rounded group gap-x-3 hover:bg-muted bg-accent dark:bg-background/50 dark:hover:bg-muted">
                            <VideoIcon className="size-5 shrink-0 text-main group-hover:text-main-hover" />
                            <div className="flex flex-col flex-1 text-main group-hover:text-main-hover">
                              <div className="text-sm">Video</div>
                              <div className="text-xs">Meet and greet friends or community on video calls</div>
                            </div>
                            <FormControl>
                              <RadioGroupItem value={ChannelType.VIDEO} />
                            </FormControl>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4 bg-muted">
              <Button disabled={!isValid || isSubmitting} variant="primary">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditChannelModal
