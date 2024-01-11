import { NextResponse } from "next/server"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"
export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
  /* add member to the requested server (if user accepted invite to the server) */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!params.serverId) return new NextResponse("ServerId missing", { status: 400 })
    const server = await db.server.update({
      where: {
        id: params.serverId,
      },
      data: {
        members: { create: [{ profileId: profile.id }] },
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log("ServerId: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
