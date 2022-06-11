import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/AmbassadorProfile/AmbassadorProfilesCell'

const DELETE_AMBASSADOR_PROFILE_MUTATION = gql`
  mutation DeleteAmbassadorProfileMutation($id: Int!) {
    deleteAmbassadorProfile(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const AmbassadorProfilesList = ({ ambassadorProfiles }) => {
  const [deleteAmbassadorProfile] = useMutation(DELETE_AMBASSADOR_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success('AmbassadorProfile deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ambassadorProfile ' + id + '?')) {
      deleteAmbassadorProfile({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>User id</th>
            <th>Quest id</th>
            <th>Twitter</th>
            <th>Profile image</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ambassadorProfiles.map((ambassadorProfile) => (
            <tr key={ambassadorProfile.id}>
              <td>{truncate(ambassadorProfile.id)}</td>
              <td>{truncate(ambassadorProfile.name)}</td>
              <td>{truncate(ambassadorProfile.userId)}</td>
              <td>{truncate(ambassadorProfile.questId)}</td>
              <td>{truncate(ambassadorProfile.twitter)}</td>
              <td>{truncate(ambassadorProfile.profileImage)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.ambassadorProfile({ id: ambassadorProfile.id })}
                    title={'Show ambassadorProfile ' + ambassadorProfile.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAmbassadorProfile({ id: ambassadorProfile.id })}
                    title={'Edit ambassadorProfile ' + ambassadorProfile.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete ambassadorProfile ' + ambassadorProfile.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ambassadorProfile.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AmbassadorProfilesList
