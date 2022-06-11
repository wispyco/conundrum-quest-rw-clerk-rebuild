import EditAmbassadorProfileCell from 'src/components/AmbassadorProfile/EditAmbassadorProfileCell'

type AmbassadorProfilePageProps = {
  id: number
}

const EditAmbassadorProfilePage = ({ id }: AmbassadorProfilePageProps) => {
  return <EditAmbassadorProfileCell id={id} />
}

export default EditAmbassadorProfilePage
