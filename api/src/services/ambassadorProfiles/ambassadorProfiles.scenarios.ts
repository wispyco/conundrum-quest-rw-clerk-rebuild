import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.AmbassadorProfileCreateArgs>({
  ambassadorProfile: {
    one: {
      data: {
        questId: 899984,
        twitter: 'String',
        profileImage: 'String',
        user: { create: { email: 'String209291' } },
      },
    },
    two: {
      data: {
        questId: 5206306,
        twitter: 'String',
        profileImage: 'String',
        user: { create: { email: 'String1718326' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
