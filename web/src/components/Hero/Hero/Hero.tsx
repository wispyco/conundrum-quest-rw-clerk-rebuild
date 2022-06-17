import humanize from 'humanize-string'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { TwitterProfile } from 'src/styles/hero'
import TwitterCell from 'src/components/TwitterCell'

const DELETE_HERO_MUTATION = gql`
  mutation DeleteHeroMutation($id: Int!) {
    deleteHero(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Hero = ({ hero }) => {
  const [deleteHero] = useMutation(DELETE_HERO_MUTATION, {
    onCompleted: () => {
      toast.success('Hero deleted')
      navigate(routes.heroes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete hero ' + id + '?')) {
      deleteHero({ variables: { id } })
    }
  }

  // const twitter = useFetchTwitter(hero.twitter)

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Hero {hero.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{hero.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{hero.name}</td>
            </tr>
            <tr>
              <th>Quest id</th>
              <td>{hero.questId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <TwitterProfile>
        <TwitterCell username={hero.twitter} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={hero.twitter}
          options={{ height: 400 }}
        />
      </TwitterProfile>
      <nav className="rw-button-group">
        <Link
          to={routes.editHero({ id: hero.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(hero.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Hero
