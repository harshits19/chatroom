import { NextResponse } from "next/server"
import { MemberRole } from "@prisma/client"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

export async function PATCH(req: Request, { params: { channelId } }: { params: { channelId: string } }) {
  /* Edit channel details (only admin or moderators) */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    if (!channelId) return new NextResponse("ChannelId Missing", { status: 400 })

    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get("serverId")
    if (!serverId) return new NextResponse("ServerId Missing", { status: 400 })

    const { name, type } = await req.json()
    if (!name || !type) return new NextResponse("Name or imageUrl values missing", { status: 400 })

    if (name === "general") return new NextResponse("Name cannot be general", { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR] /* only admin or moderators can delete channel */,
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("Edit-Channel: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params: { channelId } }: { params: { channelId: string } }) {
  /* Delete channel (only admin or moderators) */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    if (!channelId) return new NextResponse("ChannelId Missing", { status: 400 })

    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get("serverId")
    if (!serverId) return new NextResponse("ServerId Missing", { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR] /* only admin or moderators can delete channel */,
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: channelId,
            name: {
              not: "general" /* prevent accidently deleting general channel */,
            },
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("Delete-Channel: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
