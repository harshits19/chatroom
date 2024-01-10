import { redirect } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import SidebarActions from "@/components/sidebar/SidebarAction"
import SidebarItem from "@/components/sidebar/SidebarItem"
import ThemeButton from "@/components/ThemeButton"
import { UserButton } from "@clerk/nextjs"
import { db } from "@/lib/db"
import { currentProfile } from "@/lib/currentProfile"

const Sidebar = async () => {
  const profile = await currentProfile()
  if (!profile) return redirect("/")
  //find all the servers in which this user is present
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#E3E5E8] dark:bg-[#1E1F22] py-3">
      <SidebarActions />
      <Separator className="bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 h-0.5 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <SidebarItem id={server.id} imageUrl={server.imageUrl} name={server.name} />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col">
        <ThemeButton />
        <Separator className="bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 h-0.5 mx-auto my-2" />
        <div className="relative mx-3 size-12 rounded-full bg-zinc-300 dark:bg-zinc-700">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "size-12",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default Sidebar
