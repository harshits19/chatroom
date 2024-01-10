import ThemeButton from "@/components/ThemeButton"
import { UserButton } from "@clerk/nextjs"

const HomePage = () => {
  return (
    <div className="">
      HomePage
      <UserButton afterSignOutUrl="/sign-in" />
      <ThemeButton />
    </div>
  )
}
export default HomePage
