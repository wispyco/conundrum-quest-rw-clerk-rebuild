import { useAuth } from '@redwoodjs/auth'

type KnightLayoutProps = {
  children?: React.ReactNode
}

const KnightLayout = ({ children }: KnightLayoutProps) => {
  const { logOut } = useAuth()

  return (
    <>
      <button onClick={logOut}>Log Out</button>
      {children}
    </>
  )
}

export default KnightLayout
