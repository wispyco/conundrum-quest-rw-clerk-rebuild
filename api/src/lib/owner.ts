import { ForbiddenError } from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'

export const requireOwnership = async (id) => {
  const user = await db.user.findUnique({
    where: { id: id },
  })

  const uuid = context.currentUser.user.uuid

  if (!user || user.uuid !== uuid) {
    throw new ForbiddenError("You don't own this resource.")
  }
}
