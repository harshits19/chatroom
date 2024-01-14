"use client"

import { useSocket } from "@/components/providers/SocketProvider"

const SocketIndicator = () => {
  const { isConnected } = useSocket()
  if (!isConnected) return <div className="rounded-full size-4 bg-destructive"></div>
  return <div className="rounded-full size-4 bg-theme-secondary"></div>
}
export default SocketIndicator
