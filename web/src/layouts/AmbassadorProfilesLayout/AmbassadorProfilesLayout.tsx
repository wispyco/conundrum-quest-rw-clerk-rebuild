import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type AmbassadorProfileLayoutProps = {
  children: React.ReactNode
}

const AmbassadorProfilesLayout = ({ children }: AmbassadorProfileLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.ambassadorProfiles()}
            className="rw-link"
          >
            AmbassadorProfiles
          </Link>
        </h1>
        <Link
          to={routes.newAmbassadorProfile()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New AmbassadorProfile
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default AmbassadorProfilesLayout
