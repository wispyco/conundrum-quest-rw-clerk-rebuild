import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.AmbassadorProfileCreateArgs>({
  ambassadorProfile: {
    one: {
      data: {
        questId: 2259840,
        twitter: 'String',
        profileImage: 'String',
        user: { create: { email: 'String2095716' } },
      },
    },
    two: {
      data: {
        questId: 1816068,
        twitter: 'String',
        profileImage: 'String',
        user: { create: { email: 'String1870183' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
