import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import QuestsCell, { QUERY } from 'src/components/Quest/QuestsCell'

const HomePage = () => {
  const { hasRole } = useAuth()

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h1>Conundrum Quest</h1>
      <QuestsCell />
    </>
  )
}

export default HomePage
