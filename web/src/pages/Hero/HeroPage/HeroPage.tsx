import HeroCell from 'src/components/Hero/HeroCell'

type HeroPageProps = {
  id: number
}

const HeroPage = ({ id }: HeroPageProps) => {
  return <HeroCell id={id} />
}

export default HeroPage
