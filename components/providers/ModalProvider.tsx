"use client"

import CreateServerModal from "@/components/modals/CreateServerModal"
import EditServerModal from "@/components/modals/EditServerModal"
import DeleteServerModal from "@/components/modals/DeleteServerModal"
import LeaveServerModal from "@/components/modals/LeaveServerModal"
import CreateChannelModal from "@/components/modals/CreateChannelModal"
import EditChannelModal from "@/components/modals/EditChannelModal"
import DeleteChannelModal from "@/components/modals/DeleteChannelModal"
import MessageFileModal from "@/components/modals/MessageFileModal"
import DeleteMessageModal from "@/components/modals/DeleteMessageModal"
import EditProfileModal from "@/components/modals/EditProfileModal"
import MembersModal from "@/components/modals/MembersModal"
import InviteModal from "@/components/modals/InviteModal"
import { useMounted } from "@/hooks/useMounted"

const ModalProvider = () => {
  const isMounted = useMounted()
  if (!isMounted) return null

  return (
    <>
      <CreateServerModal />
      <EditServerModal />
      <DeleteServerModal />
      <LeaveServerModal />
      <CreateChannelModal />
      <EditChannelModal />
      <DeleteChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
      <EditProfileModal />
      <MembersModal />
      <InviteModal />
    </>
  )
}
export default ModalProvider
