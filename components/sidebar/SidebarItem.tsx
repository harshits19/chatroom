"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import ActionTooltip from "@/components/ActionTooltip"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  id: string
  imageUrl: string
  name: string
}

const SidebarItem = ({ id, imageUrl, name }: SidebarItemProps) => {
  const params = useParams()
  const router = useRouter()
  const isRouteActive = params?.serverId === id
  const onClick = () => {
    router.push(`/servers/${id}`)
  }
  return (
    <ActionTooltip label={name}>
      <button className="group relative flex items-center" onClick={onClick}>
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-1 group-hover:h-5",
            isRouteActive ? "h-9" : "h-2",
            isRouteActive && "group-hover:h-9"
          )}></div>
        <div
          className={cn(
            "relative group flex mx-3 size-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden",
            isRouteActive && "bg-primary/70 text-primary rounded-2xl"
          )}>
          <Image src={imageUrl} alt="server" className="object-cover object-center" sizes="50vw" priority fill />
        </div>
      </button>
    </ActionTooltip>
  )
}
export default SidebarItem
