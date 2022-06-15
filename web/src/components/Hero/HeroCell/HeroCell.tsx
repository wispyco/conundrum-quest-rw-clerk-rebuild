import type { FindHeroById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Hero from 'src/components/Hero/Hero'

export const QUERY = gql`
  query FindHeroById($id: Int!) {
    hero: hero(id: $id) {
      id
      name
      questId
      twitter
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Hero not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ hero }: CellSuccessProps<FindHeroById>) => {
  return <Hero hero={hero} />
}
