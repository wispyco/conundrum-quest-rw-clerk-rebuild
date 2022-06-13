import type { FindHeroOnQuestQuery, FindHeroOnQuestQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindHeroOnQuestQuery($id: Int!) {
    heroOnQuest: heroOnQuest(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindHeroOnQuestQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  heroOnQuest,
}: CellSuccessProps<FindHeroOnQuestQuery, FindHeroOnQuestQueryVariables>) => {
  return <div>{JSON.stringify(heroOnQuest)}</div>
}
