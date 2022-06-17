import type { FindTwitterQuery, FindTwitterQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import styled from 'styled-components'

export const QUERY = gql`
  query FindTwitterQuery($username: String!) {
    twitter: getTwitter(username: $username) {
      id
      name
      profile_image_url
      username
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindTwitterQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  twitter,
}: CellSuccessProps<FindTwitterQuery, FindTwitterQueryVariables>) => {
  return (
    <>
      <Profile>
        <p>{twitter.name}</p>
        <img src={twitter.profile_image_url} alt={twitter.name} />
      </Profile>
    </>
  )
}

const Profile = styled.span`
  position: relative;
  display: block;
  float: left;

  p {
    display: none;
    position: absolute;
    background: #fff;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    p {
      display: block;
    }
  }

  img {
    border-radius: 50%;
    margin: 25px 10px;
    display: inline-block;
  }
`
