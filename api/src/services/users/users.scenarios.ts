import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: 'String8979231' } },
    two: { data: { email: 'String3536753' } },
  },
})

export type StandardScenario = typeof standard
