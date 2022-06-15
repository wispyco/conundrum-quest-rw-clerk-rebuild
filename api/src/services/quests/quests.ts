import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  QuestResolvers,
} from 'types/graphql'

export const quests: QueryResolvers['quests'] = () => {
  return db.quest.findMany()
}

export const quest: QueryResolvers['quest'] = ({ id }) => {
  return db.quest.findUnique({
    where: { id },
  })
}

export const createQuest: MutationResolvers['createQuest'] = ({ input }) => {
  return db.quest.create({
    data: input,
  })
}

export const updateQuest: MutationResolvers['updateQuest'] = ({
  id,
  input,
}) => {
  return db.quest.update({
    data: input,
    where: { id },
  })
}

export const deleteQuest: MutationResolvers['deleteQuest'] = ({ id }) => {
  return db.quest.delete({
    where: { id },
  })
}

export const Quest: QuestResolvers = {
  submittedByuser: (_obj, { root }) =>
    db.quest.findUnique({ where: { id: root.id } }).submittedByuser(),
  heros: (_obj, { root }) =>
    db.quest.findUnique({ where: { id: root.id } }).heros(),
  ambassadors: (_obj, { root }) =>
    db.quest.findUnique({ where: { id: root.id } }).ambassadors(),
}
