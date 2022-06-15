import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { uuid: 'String3757979', email: 'String1761590' } },
    two: { data: { uuid: 'String7283886', email: 'String5190524' } },
  },
})

export type StandardScenario = typeof standard
