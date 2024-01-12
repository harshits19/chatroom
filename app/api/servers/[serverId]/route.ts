import { NextResponse } from "next/server"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

export async function PATCH(req: Request, { params: { serverId } }: { params: { serverId: string } }) {
  /* Edit server details (only admins) */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    if (!serverId) return new NextResponse("ServerId Missing", { status: 400 })

    const { name, imageUrl } = await req.json()
    if (!name || !imageUrl) return new NextResponse("Name or imageUrl values missing", { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("Edit-Server: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params: { serverId } }: { params: { serverId: string } }) {
  /* Delete server (only admins) */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    if (!serverId) return new NextResponse("ServerId Missing", { status: 400 })

    const server = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("Delete-Server: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
