import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_AMBASSADOR_PROFILE_MUTATION = gql`
  mutation DeleteAmbassadorProfileMutation($id: Int!) {
    deleteAmbassadorProfile(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const AmbassadorProfile = ({ ambassadorProfile }) => {
  const [deleteAmbassadorProfile] = useMutation(DELETE_AMBASSADOR_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success('AmbassadorProfile deleted')
      navigate(routes.ambassadorProfiles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ambassadorProfile ' + id + '?')) {
      deleteAmbassadorProfile({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">AmbassadorProfile {ambassadorProfile.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ambassadorProfile.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{ambassadorProfile.name}</td>
            </tr><tr>
              <th>User id</th>
              <td>{ambassadorProfile.userId}</td>
            </tr><tr>
              <th>Quest id</th>
              <td>{ambassadorProfile.questId}</td>
            </tr><tr>
              <th>Twitter</th>
              <td>{ambassadorProfile.twitter}</td>
            </tr><tr>
              <th>Profile image</th>
              <td>{ambassadorProfile.profileImage}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAmbassadorProfile({ id: ambassadorProfile.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ambassadorProfile.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default AmbassadorProfile
