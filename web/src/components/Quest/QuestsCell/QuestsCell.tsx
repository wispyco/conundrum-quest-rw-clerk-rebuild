import type { FindQuests } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes, useLocation } from '@redwoodjs/router'

import Quests from 'src/components/Quest/Quests'

export const QUERY = gql`
  query FindQuests {
    quests {
      id
      name
      userId
      hero {
        name
        twitter
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No quests yet. '}
      <Link to={routes.newQuest()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ quests }: CellSuccessProps<FindQuests>) => {
  return <Quests quests={quests} />
}
