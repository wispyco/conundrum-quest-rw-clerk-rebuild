import type { FindAmbassadorProfiles } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import AmbassadorProfiles from 'src/components/AmbassadorProfile/AmbassadorProfiles'

export const QUERY = gql`
  query FindAmbassadorProfiles {
    ambassadorProfiles {
      id
      name
      userId
      questId
      twitter
      profileImage
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No ambassadorProfiles yet. '}
      <Link
        to={routes.newAmbassadorProfile()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ ambassadorProfiles }: CellSuccessProps<FindAmbassadorProfiles>) => {
  return <AmbassadorProfiles ambassadorProfiles={ambassadorProfiles} />
}
