import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import AmbassadorProfileForm from 'src/components/AmbassadorProfile/AmbassadorProfileForm'

const CREATE_AMBASSADOR_PROFILE_MUTATION = gql`
  mutation CreateAmbassadorProfileMutation($input: CreateAmbassadorProfileInput!) {
    createAmbassadorProfile(input: $input) {
      id
    }
  }
`

const NewAmbassadorProfile = () => {
  const [createAmbassadorProfile, { loading, error }] = useMutation(CREATE_AMBASSADOR_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success('AmbassadorProfile created')
      navigate(routes.ambassadorProfiles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId), questId: parseInt(input.questId), })
    createAmbassadorProfile({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New AmbassadorProfile</h2>
      </header>
      <div className="rw-segment-main">
        <AmbassadorProfileForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAmbassadorProfile
