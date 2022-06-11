export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String
    role: Role!
    quests: [Quest]!
    ambassadorProfile: AmbassadorProfile
  }

  enum Role {
    ADMIN
    KNIGHT
    HERO
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    role: Role!
  }

  input UpdateUserInput {
    email: String
    name: String
    role: Role
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
