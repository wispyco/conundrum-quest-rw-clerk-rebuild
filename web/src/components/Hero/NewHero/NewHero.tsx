import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import HeroForm from 'src/components/Hero/HeroForm'

export const CREATE_HERO_MUTATION = gql`
  mutation CreateHeroMutation($input: CreateHeroInput!) {
    createHero(input: $input) {
      id
    }
  }
`

const NewHero = () => {
  const [createHero, { loading, error }] = useMutation(CREATE_HERO_MUTATION, {
    onCompleted: () => {
      toast.success('Hero created')
      navigate(routes.heroes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { questId: parseInt(input.questId) })
    createHero({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Hero</h2>
      </header>
      <div className="rw-segment-main">
        <HeroForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewHero
