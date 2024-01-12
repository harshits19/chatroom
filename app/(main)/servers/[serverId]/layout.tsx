import { redirect } from "next/navigation"
import { redirectToSignIn } from "@clerk/nextjs"
import ServerSidebar from "@/components/server-sidebar/ServerSidebar"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

interface ServerIdLayoutParams {
  children: React.ReactNode
  params: { serverId: string }
}

const ServerIdLayout = async ({ children, params: { serverId } }: ServerIdLayoutParams) => {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  //get server details(channels)
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })
  if (!server) return redirect("/")

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 flex-col hidden h-full md:flex w-60">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  )
}
export default ServerIdLayout
