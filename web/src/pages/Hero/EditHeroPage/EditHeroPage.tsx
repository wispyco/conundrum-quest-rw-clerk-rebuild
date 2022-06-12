import EditHeroCell from 'src/components/Hero/EditHeroCell'

type HeroPageProps = {
  id: number
}

const EditHeroPage = ({ id }: HeroPageProps) => {
  return <EditHeroCell id={id} />
}

export default EditHeroPage
