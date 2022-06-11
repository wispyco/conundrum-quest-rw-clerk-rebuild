import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type QuestLayoutProps = {
  children: React.ReactNode
}

const QuestsLayout = ({ children }: QuestLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.quests()}
            className="rw-link"
          >
            Quests
          </Link>
        </h1>
        <Link
          to={routes.newQuest()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Quest
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default QuestsLayout
