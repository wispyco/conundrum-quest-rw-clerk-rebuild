import type { EditAmbassadorProfileById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import AmbassadorProfileForm from 'src/components/AmbassadorProfile/AmbassadorProfileForm'

export const QUERY = gql`
  query EditAmbassadorProfileById($id: Int!) {
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
const UPDATE_AMBASSADOR_PROFILE_MUTATION = gql`
  mutation UpdateAmbassadorProfileMutation($id: Int!, $input: UpdateAmbassadorProfileInput!) {
    updateAmbassadorProfile(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ ambassadorProfile }: CellSuccessProps<EditAmbassadorProfileById>) => {
  const [updateAmbassadorProfile, { loading, error }] = useMutation(UPDATE_AMBASSADOR_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success('AmbassadorProfile updated')
      navigate(routes.ambassadorProfiles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId), questId: parseInt(input.questId), })
    updateAmbassadorProfile({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit AmbassadorProfile {ambassadorProfile.id}</h2>
      </header>
      <div className="rw-segment-main">
        <AmbassadorProfileForm ambassadorProfile={ambassadorProfile} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
