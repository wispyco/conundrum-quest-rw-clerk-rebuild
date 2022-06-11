import type { EditQuestById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import QuestForm from 'src/components/Quest/QuestForm'

export const QUERY = gql`
  query EditQuestById($id: Int!) {
    quest: quest(id: $id) {
      id
      name
      userId
    }
  }
`
const UPDATE_QUEST_MUTATION = gql`
  mutation UpdateQuestMutation($id: Int!, $input: UpdateQuestInput!) {
    updateQuest(id: $id, input: $input) {
      id
      name
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ quest }: CellSuccessProps<EditQuestById>) => {
  const [updateQuest, { loading, error }] = useMutation(UPDATE_QUEST_MUTATION, {
    onCompleted: () => {
      toast.success('Quest updated')
      navigate(routes.quests())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId), })
    updateQuest({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Quest {quest.id}</h2>
      </header>
      <div className="rw-segment-main">
        <QuestForm quest={quest} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
