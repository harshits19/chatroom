"use client"

import { useEffect } from "react"
import axios from "axios"
import * as z from "zod"
import qs from "query-string"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"

interface MessageEditProps {
  content: string
  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  deleted: boolean
  id: string
  socketUrl: string
  socketQuery: Record<string, string>
}

const formSchema = z.object({
  content: z.string().min(1),
})

const MessageEdit = ({ content, isEditing, setIsEditing, deleted, id, socketUrl, socketQuery }: MessageEditProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      content: content,
    },
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "27") setIsEditing(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    form.reset({
      content: content,
    })
  }, [content])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      })
      await axios.patch(url, values)
      setIsEditing(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (isEditing && !deleted)
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="text-sm no-focus bg-[#edeeee] dark:bg-[#383a40] border-none text-primary mt-1"
                    placeholder="edit message"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
        <div className="text-[10px] text-main mt-1">
          escape to{" "}
          <span className="mr-0.5 cursor-pointer text-theme-foreground" onClick={() => setIsEditing(false)}>
            cancel
          </span>{" "}
          • enter to save
        </div>
      </Form>
    )
}

export default MessageEdit
