import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, useLocation } from '@redwoodjs/router'

import { QUERY } from 'src/components/Quest/QuestsCell'
import { useAuth } from '@redwoodjs/auth'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  useFetchTwitterMultiple,
  useFetchTwitterMultipleQuests,
} from 'src/utils/twitter'

const DELETE_QUEST_MUTATION = gql`
  mutation DeleteQuestMutation($id: Int!) {
    deleteQuest(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const QuestsList = ({ quests }) => {
  const [deleteQuest] = useMutation(DELETE_QUEST_MUTATION, {
    onCompleted: () => {
      toast.success('Quest deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete quest ' + id + '?')) {
      deleteQuest({ variables: { id } })
    }
  }

  const { isAuthenticated, logOut } = useAuth()

  const { pathname } = useLocation()

  // const [twitter, setTwitter] = useState([])

  // const fetchTwitter = async (twitter) => {
  //   fetch(`${window.location.origin}/.redwood/functions/twitter`, {
  //     method: 'POST',
  //     body: JSON.stringify({ twitter: twitter }),
  //   })
  //     .then(function (response) {
  //       // The response is a Response instance.
  //       // You parse the data into a useable format using `.json()`
  //       return response.json()
  //     })
  //     .then(function (data) {
  //       setTwitter((prevState) => {
  //         return [{ ...prevState, ...data.data.resultAwaited.data }]
  //       })
  //     })
  // }

  // useEffect(() => {
  //   quests.forEach((quest) => {
  //     quest.heros.forEach((hero) => {
  //       if (hero.twitter) {
  //         fetchTwitter(hero.twitter)
  //       }
  //     })
  //   })
  // }, [quests])

  const twitter = useFetchTwitterMultipleQuests(quests)

  return (
    <>
      {pathname === '/' ? (
        <>
          {quests.length > 0 ? (
            <QuestCard>
              {quests.map((quest) => (
                <Link to={routes.quest({ id: quest.id })} key={quest.id}>
                  <div>
                    <h3>{truncate(quest.name)}</h3>
                    {quest.heros.map((hero, i) => (
                      <>
                        <p key={i}>{hero.name}</p>
                        {twitter && (
                          <>
                            {twitter.map((t, i) => (
                              <img
                                key={i}
                                src={t.profile_image_url}
                                alt={t.name}
                              />
                            ))}
                          </>
                        )}
                      </>
                    ))}
                  </div>
                </Link>
              ))}
            </QuestCard>
          ) : (
            <p>There are no Quests Currently</p>
          )}
        </>
      ) : (
        <div className="rw-segment rw-table-wrapper-responsive">
          <button onClick={logOut}>Log out</button>
          <table className="rw-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>User id</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {quests.map((quest) => (
                <tr key={quest.id}>
                  <td>{truncate(quest.id)}</td>
                  <td>{truncate(quest.name)}</td>
                  <td>{truncate(quest.userId)}</td>
                  <td>
                    <nav className="rw-table-actions">
                      <Link
                        to={routes.quest({ id: quest.id })}
                        title={'Show quest ' + quest.id + ' detail'}
                        className="rw-button rw-button-small"
                      >
                        Show
                      </Link>
                      <Link
                        to={routes.editQuest({ id: quest.id })}
                        title={'Edit quest ' + quest.id}
                        className="rw-button rw-button-small rw-button-blue"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        title={'Delete quest ' + quest.id}
                        className="rw-button rw-button-small rw-button-red"
                        onClick={() => onDeleteClick(quest.id)}
                      >
                        Delete
                      </button>
                    </nav>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

const QuestCard = styled.div`
  border: 1px solid #ccc;
  width: 300px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`

export default QuestsList
