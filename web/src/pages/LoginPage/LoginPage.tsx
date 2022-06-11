import { SignInButton, UserButton } from '@clerk/clerk-react'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

const LoginPage = () => {
  const { isAuthenticated, logIn, logOut } = useAuth()

  return (
    <>
      <MetaTags title="Login" description="Login page" />

      <h1>LoginPage</h1>

      {isAuthenticated ? (
        <>
          <UserButton />
          <button
            onClick={() => {
              logOut()
            }}
            className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              logIn({ afterSignIn: `${window.location.href}login` })
            }}
            className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
          >
            Log in
          </button>
        </>
      )}
    </>
  )
}

export default LoginPage
