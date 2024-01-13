import Sidebar from "@/components/sidebar/Sidebar"
import ServerSidebar from "@/components/server-sidebar/ServerSidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"

const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon className="p-2 mr-2 rounded-full cursor-pointer size-10 md:hidden hover:bg-accent" />
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0 nofocus">
        <div className="w-[72px]">
          <Sidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  )
}
export default MobileToggle
