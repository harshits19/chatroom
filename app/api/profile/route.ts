import { NextResponse } from "next/server"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

export async function PATCH(req: Request) {
  /* Edit Profile details (only logged in user) */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    const { name, imageUrl, status } = await req.json()
    if (!name || !imageUrl) return new NextResponse("Name or imageUrl values missing", { status: 400 })

    const { searchParams } = new URL(req.url)
    const profileId = searchParams.get("profileId")
    if (!profileId) return new NextResponse("ProfileId missing", { status: 400 })

    if (profileId !== profile.id) return new NextResponse("Unauthorized", { status: 401 })

    const updatedProfile = await db.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        name,
        imageUrl,
        status,
      },
    })

    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.log("Edit-Profile: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
