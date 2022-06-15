import humanize from 'humanize-string'
import React from 'react'
import { Link, routes, useLocation } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from '@redwoodjs/auth'
import { QUERY } from 'src/components/Quest/QuestsCell'
import { useFetchTwitterMultipleQuests } from 'src/utils/twitter'
import styled from 'styled-components'
import { jsonPretty } from 'src/utils/json'

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

  const twitter = useFetchTwitterMultipleQuests(quests)

  return (
    <>
      {pathname === '/' ? (
        <>
          {jsonPretty(quests)}
          {jsonPretty(twitter)}

          {quests.length > 0 ? (
            <>
              {quests.map((quest, i) => (
                <QuestCard key={quest.id}>
                  <Link to={routes.quest({ id: quest.id })} key={quest.id}>
                    <div>
                      <h3>{truncate(quest.name)}</h3>
                      {quest.heros.map((hero, index) => (
                        <React.Fragment key={hero.id}>
                          {twitter.length > 0 && twitter[i] && (
                            <span>
                              {hero.name}
                              <p>{twitter[i][index]?.name}</p>
                              <img
                                key={i}
                                src={twitter[i][index]?.profile_image_url}
                                alt={twitter[i][index]?.name}
                              />
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </Link>
                  <div className="clear" />
                </QuestCard>
              ))}
            </>
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
  span {
    position: relative;
    display: block;
    float: left;
  }
  span p {
    display: none;
    position: absolute;
    background: #fff;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  span {
    &:hover {
      p {
        display: block;
      }
    }
  }
  img {
    border-radius: 50%;
    margin: 25px 10px;
    display: inline-block;
  }
  .clear {
    clear: both;
  }
`

export default QuestsList
