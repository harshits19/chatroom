"use client"

import CreateServerModal from "@/components/modals/CreateServerModal"
import EditServerModal from "@/components/modals/EditServerModal"
import InviteModal from "@/components/modals/InviteModal"
import { useMounted } from "@/hooks/useMounted"

const ModalProvider = () => {
  const isMounted = useMounted()
  if (!isMounted) return null

  return (
    <>
      <CreateServerModal />
      <EditServerModal />
      <InviteModal />
    </>
  )
}
export default ModalProvider
