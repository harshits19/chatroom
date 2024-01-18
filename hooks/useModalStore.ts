import { create } from "zustand"
import { Channel, ChannelType, Profile, Server } from "@prisma/client"

export type ModalType =
  | "invite"
  | "acceptInvite"
  | "members"
  | "messageFile"
  | "deleteMessage"
  | "editProfile"
  | "createServer"
  | "editServer"
  | "deleteServer"
  | "leaveServer"
  | "createChannel"
  | "editChannel"
  | "deleteChannel"

interface ModalData {
  profile?: Profile
  server?: Server
  channel?: Channel
  channelType?: ChannelType
  apiUrl?: string
  query?: Record<string, any>
}

interface ModalStore {
  type: ModalType | null
  isOpen: boolean
  data: ModalData
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}
export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}))
