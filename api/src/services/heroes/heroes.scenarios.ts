import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.HeroCreateArgs>({
  hero: {
    one: { data: { questId: 3743584 } },
    two: { data: { questId: 3496758 } },
  },
})

export type StandardScenario = typeof standard
