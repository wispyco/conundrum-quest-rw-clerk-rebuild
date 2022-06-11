import QuestCell from 'src/components/Quest/QuestCell'

type QuestPageProps = {
  id: number
}

const QuestPage = ({ id }: QuestPageProps) => {
  return <QuestCell id={id} />
}

export default QuestPage
