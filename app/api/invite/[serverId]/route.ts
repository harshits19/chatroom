import { NextResponse } from "next/server"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

export async function PATCH(req: Request, { params: { serverId } }: { params: { serverId: string } }) {
  /* add member to the requested server (if user accepted invite to the server) */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    if (!serverId) return new NextResponse("ServerId missing", { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        members: { create: [{ profileId: profile.id }] },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("Accept-Invite: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
