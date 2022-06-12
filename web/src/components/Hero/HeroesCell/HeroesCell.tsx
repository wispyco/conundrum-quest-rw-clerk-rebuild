import type { FindHeroes } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Heroes from 'src/components/Hero/Heroes'

export const QUERY = gql`
  query FindHeroes {
    heroes {
      id
      name
      questId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No heroes yet. '}
      <Link
        to={routes.newHero()}
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

export const Success = ({ heroes }: CellSuccessProps<FindHeroes>) => {
  return <Heroes heroes={heroes} />
}
