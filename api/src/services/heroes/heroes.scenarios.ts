import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.HeroCreateArgs>({
  hero: {
    one: { data: { questId: 5993030, twitter: 'String' } },
    two: { data: { questId: 4219291, twitter: 'String' } },
  },
})

export type StandardScenario = typeof standard
