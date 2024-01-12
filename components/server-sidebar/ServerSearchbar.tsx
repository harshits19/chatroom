"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { SearchIcon } from "lucide-react"

interface ServerSearchbarProps {
  data: {
    label: string
    type: "channel" | "member"
    data:
      | {
          icon: React.ReactNode
          name: string
          id: string
        }[]
      | undefined
  }[]
}

const ServerSearchbar = ({ data }: ServerSearchbarProps) => {
  const params = useParams()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const onClick = ({ id, type }: { id: string; type: "channel" | "member" }) => {
    setIsOpen(false)
    if (type === "member") router.push(`/servers/${params?.serverId}/conversations/${id}`)
    else router.push(`/servers/${params?.serverId}/channels/${id}`)
  }

  return (
    <>
      <button
        className="flex items-center w-full p-2 transition-colors rounded-md gap-x-2 text-main hover:text-main-hover hover:bg-muted dark:hover:bg-accent"
        onClick={() => setIsOpen(true)}>
        <SearchIcon className="size-4" />
        <p className="text-sm font-semibold">Search</p>
      </button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search all channels or members" />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null
            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
export default ServerSearchbar
