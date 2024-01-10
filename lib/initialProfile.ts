import { currentUser, redirectToSignIn } from "@clerk/nextjs"
import { db } from "@/lib/db"

export const initialProfile = async () => {
  const user = await currentUser()
  //if not signed in - return to sign-in page
  if (!user) return redirectToSignIn()
  // finding current user in db
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  })
  //if user signed in previously, then his profile would be created
  if (profile) return profile
  //If user signing-in for the first time
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  })
  return newProfile
}
