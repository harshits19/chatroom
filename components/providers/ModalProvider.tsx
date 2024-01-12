"use client"

import CreateServerModal from "@/components/modals/CreateServerModal"
import EditServerModal from "@/components/modals/EditServerModal"
import DeleteServerModal from "@/components/modals/DeleteServerModal"
import LeaveServerModal from "@/components/modals/LeaveServerModal"
import CreateChannelModal from "@/components/modals/CreateChannelModal"
import InviteModal from "@/components/modals/InviteModal"
import MembersModal from "@/components/modals/MembersModal"
import { useMounted } from "@/hooks/useMounted"

const ModalProvider = () => {
  const isMounted = useMounted()
  if (!isMounted) return null

  return (
    <>
      <CreateServerModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <CreateChannelModal />
      <MembersModal />
      <EditServerModal />
      <InviteModal />
    </>
  )
}
export default ModalProvider
