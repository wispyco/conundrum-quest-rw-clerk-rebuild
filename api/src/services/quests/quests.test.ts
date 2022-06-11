import { quests, quest, createQuest, updateQuest, deleteQuest } from './quests'
import type { StandardScenario } from './quests.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('quests', () => {
  scenario('returns all quests', async (scenario: StandardScenario) => {
    const result = await quests()

    expect(result.length).toEqual(Object.keys(scenario.quest).length)
  })

  scenario('returns a single quest', async (scenario: StandardScenario) => {
    const result = await quest({ id: scenario.quest.one.id })

    expect(result).toEqual(scenario.quest.one)
  })

  scenario('creates a quest', async (scenario: StandardScenario) => {
    const result = await createQuest({
      input: { userId: scenario.quest.two.userId },
    })

    expect(result.userId).toEqual(scenario.quest.two.userId)
  })

  scenario('updates a quest', async (scenario: StandardScenario) => {
    const original = await quest({ id: scenario.quest.one.id })
    const result = await updateQuest({
      id: original.id,
      input: { userId: scenario.quest.two.userId },
    })

    expect(result.userId).toEqual(scenario.quest.two.userId)
  })

  scenario('deletes a quest', async (scenario: StandardScenario) => {
    const original = await deleteQuest({ id: scenario.quest.one.id })
    const result = await quest({ id: original.id })

    expect(result).toEqual(null)
  })
})
