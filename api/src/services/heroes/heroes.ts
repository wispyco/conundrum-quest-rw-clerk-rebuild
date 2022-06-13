import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  HeroResolvers,
} from 'types/graphql'

export const heroes: QueryResolvers['heroes'] = () => {
  return db.hero.findMany()
}

export const hero: QueryResolvers['hero'] = ({ id }) => {
  return db.hero.findUnique({
    where: { id },
  })
}

export const createHero: MutationResolvers['createHero'] = ({ input }) => {
  return db.hero.create({
    data: input,
  })
}

export const updateHero: MutationResolvers['updateHero'] = ({ id, input }) => {
  return db.hero.update({
    where: { id: id },
    data: { quests: { connect: [{ id: input.questId }] } },
  })
}

export const deleteHero: MutationResolvers['deleteHero'] = ({ id }) => {
  return db.hero.delete({
    where: { id },
  })
}

export const Hero: HeroResolvers = {
  quests: (_obj, { root }) =>
    db.hero.findUnique({ where: { id: root.id } }).quests(),
}
