export const schema = gql`
  type User {
    id: Int!
    uuid: String!
    email: String!
    name: String
    userRoles: [UserRole]!
    quests: [Quest]!
    ambassadorProfile: AmbassadorProfile
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    uuid: String!
    email: String!
    name: String
  }

  input UpdateUserInput {
    uuid: String
    email: String
    name: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
