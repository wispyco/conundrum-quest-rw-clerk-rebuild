import { Form, TextField, PasswordField, Submit } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

const SignupPage = () => {
  const { client } = useAuth()
  const [error, setError] = React.useState(null)

  const onSubmit = async (data) => {
    setError(null)
    try {
      const response = await client.auth.signUp({
        email: data.email,
        password: data.password,
      })
      console.log('response: ', response)
      response?.error?.message && setError(response.error.message)
    } catch (error) {
      console.log('error:  ', error)
      setError(error.message)
    }
  }
  return (
    <>
      <MetaTags title="Signup" description="Signup page" />

      <h1>SignupPage</h1>
      <Form onSubmit={onSubmit}>
        {error && <p>{error}</p>}

        <TextField name="email" placeholder="email" />
        <PasswordField name="password" placeholder="password" />
        <Submit>Sign Up</Submit>
      </Form>
    </>
  )
}

export default SignupPage
