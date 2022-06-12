import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.QuestCreateArgs>({
  quest: {
    one: {
      data: {
        submittedByuser: {
          create: { uuid: 'String9929818', email: 'String9853049' },
        },
      },
    },
    two: {
      data: {
        submittedByuser: {
          create: { uuid: 'String8819790', email: 'String2194987' },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
