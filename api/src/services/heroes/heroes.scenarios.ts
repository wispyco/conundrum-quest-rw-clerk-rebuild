import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.HeroCreateArgs>({
  hero: {
    one: { data: { questId: 7053371, twitter: 'String' } },
    two: { data: { questId: 6011374, twitter: 'String' } },
  },
})

export type StandardScenario = typeof standard
