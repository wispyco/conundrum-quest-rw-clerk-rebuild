import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.QuestCreateArgs>({
  quest: {
    one: {
      data: {
        submittedByuser: {
          create: { uuid: 'String3941882', email: 'String9282525' },
        },
      },
    },
    two: {
      data: {
        submittedByuser: {
          create: { uuid: 'String8181025', email: 'String4121191' },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
