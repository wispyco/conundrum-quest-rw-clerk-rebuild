import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.HeroCreateArgs>({
  hero: {
    one: { data: { questId: 1131423 } },
    two: { data: { questId: 6692817 } },
  },
})

export type StandardScenario = typeof standard
