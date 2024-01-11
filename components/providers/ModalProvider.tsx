"use client"

import CreateServerModal from "@/components/modals/CreateServerModal"
import { useMounted } from "@/hooks/useMounted"

const ModalProvider = () => {
  const isMounted = useMounted()
  if (!isMounted) return null

  return (
    <>
      <CreateServerModal />
    </>
  )
}
export default ModalProvider
