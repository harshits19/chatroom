import { useEffect, useState } from "react"

export const useMounted = () => {
  const [isMounted, setisMounted] = useState<boolean>(false)
  useEffect(() => {
    setisMounted(true)
  }, [])
  return isMounted
}