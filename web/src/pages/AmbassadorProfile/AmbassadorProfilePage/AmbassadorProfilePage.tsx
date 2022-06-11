import AmbassadorProfileCell from 'src/components/AmbassadorProfile/AmbassadorProfileCell'

type AmbassadorProfilePageProps = {
  id: number
}

const AmbassadorProfilePage = ({ id }: AmbassadorProfilePageProps) => {
  return <AmbassadorProfileCell id={id} />
}

export default AmbassadorProfilePage
