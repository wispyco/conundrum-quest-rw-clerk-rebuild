import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import styled from 'styled-components'
import { Profiler, useEffect, useState } from 'react'

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

  const [twitter, setTwitter] = useState(null)

  const fetchTwitter = async (twitter) => {
    fetch(`${window.location.origin}/.redwood/functions/twitter`, {
      method: 'POST',
      body: JSON.stringify({ twitter: twitter }),
    })
      .then(function (response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json()
      })
      .then(function (data) {
        setTwitter(data.data.resultAwaited.data)
      })
  }

  useEffect(() => {
    if (hero.twitter && !twitter) {
      fetchTwitter(hero.twitter)
    }
  }, [hero.twitter])

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
        <img src={twitter?.profile_image_url} alt={twitter?.name} />
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

const TwitterProfile = styled.div`
  width: 350px;
  margin: 50px auto;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`

export default Hero
