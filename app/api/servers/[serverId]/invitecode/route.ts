import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
  /* Generate a new invite-code for requested server */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
    if (!params.serverId) return new NextResponse("ServerId missing", { status: 400 })
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log("ServerId: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
