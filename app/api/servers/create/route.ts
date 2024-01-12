import { NextResponse } from "next/server"
import { MemberRole } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  /* To create a new server (when user logs in first time or when user wants to create one)  */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    const { name, imageUrl } = await req.json()
    if (!name || !imageUrl) return new NextResponse("Name or imageUrl values missing", { status: 400 })

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    })
    
    return NextResponse.json(server)
  } catch (error) {
    console.log("Create-Server: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
