import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.QuestCreateArgs>({
  quest: {
    one: { data: { submittedByuser: { create: { email: 'String6572325' } } } },
    two: { data: { submittedByuser: { create: { email: 'String2968478' } } } },
  },
})

export type StandardScenario = typeof standard
