"use client"

import { useRouter } from "next/navigation"
import * as z from "zod"
import axios from "axios"
import qs from "query-string"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import EmojiPicker from "@/components/EmojiPicker"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { useModal } from "@/hooks/useModalStore"
import { Plus } from "lucide-react"

interface ChatInputProps {
  apiUrl: string
  query: Record<string, any>
  name: string
  type: "conversation" | "channel"
}

const formSchema = z.object({
  content: z.string().min(1),
})

const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const router = useRouter()
  const { onOpen } = useModal()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(formSchema),
  })

  // const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      })
      await axios.post(url, values)
      form.reset()
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <div
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                    className="absolute rounded-full bg-primary/70 hover:bg-primary/85 top-7 left-8">
                    <Plus className="p-[3px] size-[22px] text-primary-foreground/85" />
                  </div>
                  <Input
                    {...field}
                    onSubmit={(e) => e.stopPropagation()}
                    // disabled={isSubmitting}
                    placeholder={`Message ${type === "channel" && "#" + name}`}
                    className="h-11 px-14 no-focus bg-[#f5f6f7] dark:bg-[#383a40] border-none text-primary"
                  />
                  <div className="absolute top-[26px] right-8">
                    <EmojiPicker onChange={(emoji: string) => field.onChange(`${field.value}${emoji}`)} />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
export default ChatInput
