import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import Navigation from 'src/components/Navigation/Navigation'

type QuestLayoutProps = {
  children: React.ReactNode
}

const QuestsLayout = ({ children }: QuestLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Navigation />
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default QuestsLayout
