import { NextResponse } from "next/server"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

export async function PATCH(req: Request, { params: { serverId } }: { params: { serverId: string } }) {
  /* Leave server */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    if (!serverId) return new NextResponse("ServerId Missing", { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: {
          not: profile.id /* prevent admin from leaving server accidently */,
        },
        members: {
          some: {
            profileId: profile.id /* confirming that leaving user is originally part of this server */,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("Leave Server: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
