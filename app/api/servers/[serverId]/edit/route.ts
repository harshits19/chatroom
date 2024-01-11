import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params: { serverId } }: { params: { serverId: string } }) {
  /* Edit server details */
  try {
    const { name, imageUrl } = await req.json()
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    const server = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        name,
        imageUrl,
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log("ServerEdit: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
