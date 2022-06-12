import { heroes, hero, createHero, updateHero, deleteHero } from './heroes'
import type { StandardScenario } from './heroes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('heroes', () => {
  scenario('returns all heroes', async (scenario: StandardScenario) => {
    const result = await heroes()

    expect(result.length).toEqual(Object.keys(scenario.hero).length)
  })

  scenario('returns a single hero', async (scenario: StandardScenario) => {
    const result = await hero({ id: scenario.hero.one.id })

    expect(result).toEqual(scenario.hero.one)
  })

  scenario('creates a hero', async () => {
    const result = await createHero({
      input: { questId: 9426422, twitter: 'String' },
    })

    expect(result.questId).toEqual(9426422)
    expect(result.twitter).toEqual('String')
  })

  scenario('updates a hero', async (scenario: StandardScenario) => {
    const original = await hero({ id: scenario.hero.one.id })
    const result = await updateHero({
      id: original.id,
      input: { questId: 483169 },
    })

    expect(result.questId).toEqual(483169)
  })

  scenario('deletes a hero', async (scenario: StandardScenario) => {
    const original = await deleteHero({ id: scenario.hero.one.id })
    const result = await hero({ id: original.id })

    expect(result).toEqual(null)
  })
})
