import { useAuth } from '@redwoodjs/auth'
import { Form, Label, PasswordField, Submit, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { useEffect, useState } from 'react'

const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`
const CREATE_USER_ROLE = gql`
  mutation createUserRole($input: CreateUserRoleInput!) {
    createUserRole(input: $input) {
      id
    }
  }
`

const SignupAdminPage = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Account Created')
      // navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const [createUserRole, { loading: loadingRole, error: errorRole }] =
    useMutation(CREATE_USER_ROLE, {
      onCompleted: () => {
        toast.success('User Role Created')
        // navigate(routes.users())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const {
    signUp,
    logOut,
    isAuthenticated,
    currentUser,
    userMetadata,
    hasRole,
    reauthenticate,
  } = useAuth()

  const [password, setPassword] = useState(null)

  const onSubmit = async (data) => {
    try {
      setPassword(data.password)
      await signUp({ email: data.email })
    } catch (e) {
      console.log(e)
    }
  }

  const initAccount = async () => {
    const user = await createUser({
      variables: {
        input: {
          email: userMetadata.email,
          uuid: userMetadata.issuer,
        },
      },
    })
    await createUserRole({
      variables: {
        input: {
          userId: user.data.createUser.id,
          name: 'ADMIN',
          password: password,
        },
      },
    })
    reauthenticate()
  }

  useEffect(() => {
    if (isAuthenticated && !hasRole('ADMIN')) {
      initAccount()
    }
    if (isAuthenticated && hasRole('ADMIN')) {
      navigate(routes.users())
    }
  }, [userMetadata])

  if (loading || loadingRole) return <div>Loading...</div>

  if (error || errorRole) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return (
    <>
      <MetaTags title="Signup" description="Signup page" />

      <h1>SignupPage</h1>
      <>{isAuthenticated && <button onClick={logOut}>Sign out</button>}</>

      {!isAuthenticated && (
        <Form onSubmit={onSubmit}>
          <Label name="email">email</Label>
          <TextField name="email" />
          <Label name="password">password</Label>
          <PasswordField name="password" />
          <Submit>Signup</Submit>
        </Form>
      )}
    </>
  )
}

export default SignupAdminPage
