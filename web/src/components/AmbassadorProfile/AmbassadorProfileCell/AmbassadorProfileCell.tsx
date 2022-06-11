import type { FindAmbassadorProfileById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import AmbassadorProfile from 'src/components/AmbassadorProfile/AmbassadorProfile'

export const QUERY = gql`
  query FindAmbassadorProfileById($id: Int!) {
    ambassadorProfile: ambassadorProfile(id: $id) {
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

export const Empty = () => <div>AmbassadorProfile not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ ambassadorProfile }: CellSuccessProps<FindAmbassadorProfileById>) => {
  return <AmbassadorProfile ambassadorProfile={ambassadorProfile} />
}
