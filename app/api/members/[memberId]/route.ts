import { NextResponse } from "next/server"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

export async function PATCH(req: Request, { params: { memberId } }: { params: { memberId: string } }) {
  /* Change member role  (only admins)*/
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    const { searchParams } = new URL(req.url)
    const { role } = await req.json()
    const serverId = searchParams.get("serverId")

    if (!serverId || !memberId) return new NextResponse("ServerId or MemberId missing", { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id /*only admin of this server is allowed */,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id /* prevent admin changing role himself */,
              },
            },
            data: { role },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("Member-Role-Change: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params: { memberId } }: { params: { memberId: string } }) {
  /* Delete server members (admin only) */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get("serverId")

    if (!serverId || !memberId) return new NextResponse("ServerId or MemberId missing", { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id /*only admin of this server is allowed */,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profile.id /* prevent admin from deleting himself */,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("Member-Delete: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
