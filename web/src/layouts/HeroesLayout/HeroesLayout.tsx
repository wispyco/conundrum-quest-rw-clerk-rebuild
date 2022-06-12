import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type HeroLayoutProps = {
  children: React.ReactNode
}

const HeroesLayout = ({ children }: HeroLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.heroes()}
            className="rw-link"
          >
            Heroes
          </Link>
        </h1>
        <Link
          to={routes.newHero()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Hero
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default HeroesLayout
