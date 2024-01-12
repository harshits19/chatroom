import { NextResponse } from "next/server"
import { MemberRole } from "@prisma/client"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  /* Create a new channel for a server  */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    const { name, type } = await req.json()
    if (!name || !type) return new NextResponse("Name or Type values missing", { status: 400 })

    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get("serverId")
    if (!serverId) return new NextResponse("ServerId missing", { status: 400 })

    if (name === "general") return new NextResponse("Name cannot be 'general'", { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [
                MemberRole.ADMIN,
                MemberRole.MODERATOR,
              ] /* Only admins and moderator are allowed to create channels */,
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log("SERVER_POST", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
