import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const Navigation = () => {
  const { logOut } = useAuth()

  return (
    <header className="rw-header">
      <h1 className="rw-heading rw-heading-primary">
        <Link to={routes.home()} className="rw-link">
          Home
        </Link>
      </h1>
      <Link to={routes.newQuest()} className="rw-button rw-button-green">
        <button onClick={logOut}>Log out</button>
      </Link>
    </header>
  )
}

export default Navigation
