import InitialModal from "@/components/modals/InitialModal"
import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initialProfile"
import { redirect } from "next/navigation"

const SetupPage = async () => {
  const profile = await initialProfile()
  //find the first server in which this user is present as a member
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })
  //if there's any server in which user is present, then redirect to that server
  if (server) return redirect(`/servers/${server.id}`)
  //else ask him to create one
  return (
    <div>
      <InitialModal />
    </div>
  )
}
export default SetupPage
