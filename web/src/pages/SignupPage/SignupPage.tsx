import { useAuth } from '@redwoodjs/auth'
import { Form, Label, Submit, TextField } from '@redwoodjs/forms'
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

const SignupPage = () => {
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

  const onSubmit = async (data) => {
    try {
      await signUp({ ...data })
    } catch (e) {
      console.log(e)
    }
  }

  const [go, setGo] = useState(null)

  const initAccount = async () => {
    const user = await createUser({
      variables: {
        input: {
          email: userMetadata.email,
          uuid: userMetadata.issuer,
        },
      },
    })
    setGo(user)
  }
  const initAccountRole = async () => {
    await createUserRole({
      variables: {
        input: {
          userId: currentUser.user.id,
          name: 'KNIGHT',
        },
      },
    })
  }

  useEffect(() => {
    if (isAuthenticated && !userMetadata.issuer) {
      initAccount()
    }
    if (
      isAuthenticated &&
      userMetadata.issuer &&
      currentUser.user.id &&
      !hasRole('KNIGHT')
    ) {
      initAccountRole()
    }
    if (isAuthenticated && hasRole('KNIGHT')) {
      navigate(routes.user({ id: currentUser.user.id }))
    }
  }, [userMetadata, currentUser])

  if (loading || loadingRole) return <div>Loading...</div>

  if (error || errorRole) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return (
    <>
      <MetaTags title="Signup" description="Signup page" />

      <h1>SignupPage</h1>
      <>{isAuthenticated && <button onClick={logOut}>Sign out</button>}</>
      <>
        {isAuthenticated && <pre>{JSON.stringify(userMetadata, null, 2)}</pre>}
        {isAuthenticated && <pre>{JSON.stringify(currentUser, null, 2)}</pre>}
      </>

      {!isAuthenticated && (
        <Form onSubmit={onSubmit}>
          <Label name="email">email</Label>
          <TextField name="email" />
          <Submit>Signup</Submit>
        </Form>
      )}
    </>
  )
}

export default SignupPage
