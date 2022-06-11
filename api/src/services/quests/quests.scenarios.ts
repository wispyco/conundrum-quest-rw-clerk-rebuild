import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.QuestCreateArgs>({
  quest: {
    one: { data: { submittedByuser: { create: { email: 'String6614687' } } } },
    two: { data: { submittedByuser: { create: { email: 'String7886161' } } } },
  },
})

export type StandardScenario = typeof standard
