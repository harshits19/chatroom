import { db } from "@/lib/db"

export const getOrCreateConversations = async (memberOneId: string, memberTwoId: string) => {
  try {
    //first find conversation, if there is'nt then create one
    let conversation =
      (await findConversations(memberOneId, memberTwoId)) || (await findConversations(memberTwoId, memberOneId))
    if (!conversation) conversation = await createNewConversation(memberOneId, memberTwoId)
    return conversation
  } catch (error) {
    console.log(error)
    return null
  }
}

const findConversations = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

const createNewConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}
