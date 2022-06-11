export const schema = gql`
  type AmbassadorProfile {
    id: Int!
    name: String
    userId: Int!
    questId: Int!
    user: User!
    quest: [Quest]!
    twitter: String!
    profileImage: String!
  }

  type Query {
    ambassadorProfiles: [AmbassadorProfile!]! @requireAuth
    ambassadorProfile(id: Int!): AmbassadorProfile @requireAuth
  }

  input CreateAmbassadorProfileInput {
    name: String
    userId: Int!
    questId: Int!
    twitter: String!
    profileImage: String!
  }

  input UpdateAmbassadorProfileInput {
    name: String
    userId: Int
    questId: Int
    twitter: String
    profileImage: String
  }

  type Mutation {
    createAmbassadorProfile(
      input: CreateAmbassadorProfileInput!
    ): AmbassadorProfile! @requireAuth
    updateAmbassadorProfile(
      id: Int!
      input: UpdateAmbassadorProfileInput!
    ): AmbassadorProfile! @requireAuth
    deleteAmbassadorProfile(id: Int!): AmbassadorProfile! @requireAuth
  }
`
