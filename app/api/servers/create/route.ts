import { NextResponse } from "next/server"
import { MemberRole } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  /* To create a new server (when user logs in first time or when user wants to create one)  */
  try {
    const { name, imageUrl } = await req.json()
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })
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
    console.log("SERVER_POST", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
