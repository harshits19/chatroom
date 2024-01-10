import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/api/uploadthing"],
  debug: false,
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
