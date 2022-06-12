import {
  ambassadorProfiles,
  ambassadorProfile,
  createAmbassadorProfile,
  updateAmbassadorProfile,
  deleteAmbassadorProfile,
} from './ambassadorProfiles'
import type { StandardScenario } from './ambassadorProfiles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ambassadorProfiles', () => {
  scenario(
    'returns all ambassadorProfiles',
    async (scenario: StandardScenario) => {
      const result = await ambassadorProfiles()

      expect(result.length).toEqual(
        Object.keys(scenario.ambassadorProfile).length
      )
    }
  )

  scenario(
    'returns a single ambassadorProfile',
    async (scenario: StandardScenario) => {
      const result = await ambassadorProfile({
        id: scenario.ambassadorProfile.one.id,
      })

      expect(result).toEqual(scenario.ambassadorProfile.one)
    }
  )

  scenario(
    'creates a ambassadorProfile',
    async (scenario: StandardScenario) => {
      const result = await createAmbassadorProfile({
        input: {
          userId: scenario.ambassadorProfile.two.userId,
          questId: 682003,
          twitter: 'String',
          profileImage: 'String',
        },
      })

      expect(result.userId).toEqual(scenario.ambassadorProfile.two.userId)
      expect(result.questId).toEqual(682003)
      expect(result.twitter).toEqual('String')
      expect(result.profileImage).toEqual('String')
    }
  )

  scenario(
    'updates a ambassadorProfile',
    async (scenario: StandardScenario) => {
      const original = await ambassadorProfile({
        id: scenario.ambassadorProfile.one.id,
      })
      const result = await updateAmbassadorProfile({
        id: original.id,
        input: { questId: 4959143 },
      })

      expect(result.questId).toEqual(4959143)
    }
  )

  scenario(
    'deletes a ambassadorProfile',
    async (scenario: StandardScenario) => {
      const original = await deleteAmbassadorProfile({
        id: scenario.ambassadorProfile.one.id,
      })
      const result = await ambassadorProfile({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
