import type { EditHeroById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import HeroForm from 'src/components/Hero/HeroForm'

export const QUERY = gql`
  query EditHeroById($id: Int!) {
    hero: hero(id: $id) {
      id
      name
      questId
    }
  }
`
const UPDATE_HERO_MUTATION = gql`
  mutation UpdateHeroMutation($id: Int!, $input: UpdateHeroInput!) {
    updateHero(id: $id, input: $input) {
      id
      name
      questId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ hero }: CellSuccessProps<EditHeroById>) => {
  const [updateHero, { loading, error }] = useMutation(UPDATE_HERO_MUTATION, {
    onCompleted: () => {
      toast.success('Hero updated')
      navigate(routes.heroes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { questId: parseInt(input.questId), })
    updateHero({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Hero {hero.id}</h2>
      </header>
      <div className="rw-segment-main">
        <HeroForm hero={hero} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
