import { useAuth } from '@redwoodjs/auth'
import { Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useEffect } from 'react'

const SigninPage = () => {
  const { logIn, isAuthenticated, hasRole, currentUser, logOut } = useAuth()

  const onSubmit = async (data) => {
    try {
      await logIn({ ...data })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (isAuthenticated && hasRole('KNIGHT')) {
      navigate(routes.user({ id: currentUser.user.id }))
    }
  }, [currentUser])

  return (
    <>
      <MetaTags title="Signin" description="Signin page" />

      <h1>SigninPage</h1>
      {isAuthenticated && <button onClick={logOut}>Log out</button>}
      {!isAuthenticated && (
        <Form onSubmit={onSubmit}>
          <Label name="email">email</Label>
          <TextField name="email" />
          <Submit>SignIn</Submit>
        </Form>
      )}
    </>
  )
}

export default SigninPage
