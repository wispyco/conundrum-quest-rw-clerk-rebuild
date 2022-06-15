import type { FindQuestById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Quest from 'src/components/Quest/Quest'

export const QUERY = gql`
  query FindQuestById($id: Int!) {
    quest: quest(id: $id) {
      id
      name
      userId
      heros {
        id
        name
        twitter
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Quest not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ quest, create }: CellSuccessProps<FindQuestById>) => {
  return <Quest create={create} quest={quest} />
}
