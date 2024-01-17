import { NextResponse } from "next/server"
import { Message } from "@prisma/client"
import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"

const MESSAGES_BATCH_LIMIT = 10

export async function GET(req: Request) {
  /* fetch messages of requested channels (used in useChatQuery hook */
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse("Unauthorized", { status: 401 })

    const { searchParams } = new URL(req.url)
    const cursor = searchParams.get("cursor")
    const channelId = searchParams.get("channelId")
    if (!channelId) return new NextResponse("ChannelId missing", { status: 400 })

    let messages: Message[] = []

    if (cursor) {
      /* when already fetched first page, then skip 'n' objects pointed by cursor */
      messages = await db.message.findMany({
        take: MESSAGES_BATCH_LIMIT /* pull 'n' objects in one go */,
        skip: 1,
        cursor: {
          id: cursor /* cursor points to the last id of message fetched from db */,
        },
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    } else {
      /* if there's no cursor(means first page) */
      messages = await db.message.findMany({
        take: MESSAGES_BATCH_LIMIT,
        where: { channelId },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    }

    let nextCursor = null
    /* if number of recently fetched messages are equal to Batch_limit then it means there are more messages left to be fetched ,
     in that case point nextCursor to the last message of currently fetched messages*/
    if (messages.length === MESSAGES_BATCH_LIMIT) {
      nextCursor = messages[MESSAGES_BATCH_LIMIT - 1].id
    }

    return NextResponse.json({
      items: messages,
      nextCursor,
    })
  } catch (error) {
    console.log("Fetch-Messages: ", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
