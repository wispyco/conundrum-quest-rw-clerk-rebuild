import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import styled from 'styled-components'
import QuestsCell from 'src/components/Quest/QuestsCell'
import { TwitterProfile } from 'src/styles/hero'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { useFetchTwitter, useFetchTwitterMultiple } from 'src/utils/twitter'
import TwitterCell from 'src/components/TwitterCell'

const DELETE_QUEST_MUTATION = gql`
  mutation DeleteQuestMutation($id: Int!) {
    deleteQuest(id: $id) {
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

const Quest = ({ quest, create }) => {
  const [deleteQuest] = useMutation(DELETE_QUEST_MUTATION, {
    onCompleted: () => {
      toast.success('Quest deleted')
      navigate(routes.quests())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete quest ' + id + '?')) {
      deleteQuest({ variables: { id } })
    }
  }

  const addHero = (id) => {
    navigate(routes.addHeroToQuest({ id: id }))
  }

  const { isAuthenticated } = useAuth()

  return (
    <>
      {!create ? (
        <QuestStyle>
          <h1>{quest.name}</h1>
          <button onClick={() => addHero(quest.id)}>
            Add a hero working on this problem
          </button>
          {quest.heros.map((hero, i) => (
            <TwitterProfile className="hover" key={hero.id}>
              {hero && <TwitterCell username={hero.twitter} />}

              <div className="more">
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName={hero.twitter}
                  options={{ height: 400 }}
                />
              </div>
            </TwitterProfile>
          ))}
        </QuestStyle>
      ) : (
        <h1>{quest.name}</h1>
      )}
    </>
  )
}

const QuestStyle = styled.div`
  display: block;

  margin: 0 auto;
  width: 75%;
  button{
    margin: 0 auto;
    width: 300px;
    display:block;
  }
  h1 {
    text-align: center;
    grid-column: 1 / span 3;
  }
  .mast {
    display: grid;
    align-items: center;
    justify-items: center;
  }
  .more {
    display: none;
  }
  .hover{
    float:left;
    &:hover {
      cursor: pointer;
      .more {
        display: block;
      }
    }
  }
  }
`

export default Quest
