import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  AmbassadorProfileResolvers,
} from 'types/graphql'

export const ambassadorProfiles: QueryResolvers['ambassadorProfiles'] = () => {
  return db.ambassadorProfile.findMany()
}

export const ambassadorProfile: QueryResolvers['ambassadorProfile'] = ({
  id,
}) => {
  return db.ambassadorProfile.findUnique({
    where: { id },
  })
}

export const createAmbassadorProfile: MutationResolvers['createAmbassadorProfile'] =
  ({ input }) => {
    return db.ambassadorProfile.create({
      data: input,
    })
  }

export const updateAmbassadorProfile: MutationResolvers['updateAmbassadorProfile'] =
  ({ id, input }) => {
    return db.ambassadorProfile.update({
      data: input,
      where: { id },
    })
  }

export const deleteAmbassadorProfile: MutationResolvers['deleteAmbassadorProfile'] =
  ({ id }) => {
    return db.ambassadorProfile.delete({
      where: { id },
    })
  }

export const AmbassadorProfile: AmbassadorProfileResolvers = {
  user: (_obj, { root }) =>
    db.ambassadorProfile.findUnique({ where: { id: root.id } }).user(),
  quest: (_obj, { root }) =>
    db.ambassadorProfile.findUnique({ where: { id: root.id } }).quest(),
}
