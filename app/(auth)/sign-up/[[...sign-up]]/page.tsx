import { SignUp } from "@clerk/nextjs"

const SignupPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignUp />
    </div>
  )
}
export default SignupPage