import EditQuestCell from 'src/components/Quest/EditQuestCell'

type QuestPageProps = {
  id: number
}

const EditQuestPage = ({ id }: QuestPageProps) => {
  return <EditQuestCell id={id} />
}

export default EditQuestPage
