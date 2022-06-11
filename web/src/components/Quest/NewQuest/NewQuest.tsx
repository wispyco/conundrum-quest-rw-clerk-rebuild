import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import QuestForm from 'src/components/Quest/QuestForm'

const CREATE_QUEST_MUTATION = gql`
  mutation CreateQuestMutation($input: CreateQuestInput!) {
    createQuest(input: $input) {
      id
    }
  }
`

const NewQuest = () => {
  const [createQuest, { loading, error }] = useMutation(CREATE_QUEST_MUTATION, {
    onCompleted: () => {
      toast.success('Quest created')
      navigate(routes.quests())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId), })
    createQuest({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Quest</h2>
      </header>
      <div className="rw-segment-main">
        <QuestForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewQuest
