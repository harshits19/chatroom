import { create } from "zustand"

interface MemberSection {
  isOpen: boolean
  setClose: () => void
  toggle: () => void
}

export const useMemberSidebar = create<MemberSection>((set) => ({
  isOpen: true,
  setClose: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))
