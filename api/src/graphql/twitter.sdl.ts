export const schema = gql`
  type Twitter {
    name: String!
    username: String!
    id: String!
    profile_image_url: String!
  }

  type Query {
    getTwitter(name: String!): Twitter! @skipAuth
  }
`
