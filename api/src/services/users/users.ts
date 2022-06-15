import { db } from 'src/lib/db'
import { requireOwnership } from 'src/lib/owner'
import type {
  QueryResolvers,
  MutationResolvers,
  UserResolvers,
} from 'types/graphql'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = async ({
  id,
  input,
}) => {
  console.log('id id id', id)

  await requireOwnership(id)

  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserResolvers = {
  userRoles: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).userRoles(),
  quests: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).quests(),
  ambassadorProfile: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).ambassadorProfile(),
}
