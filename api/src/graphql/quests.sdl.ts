export const schema = gql`
  type Quest {
    id: Int!
    name: String
    userId: Int!
    submittedByuser: User!
    heros: [Hero]!
    ambassadors: [AmbassadorProfile]!
  }

  type Query {
    quests: [Quest!]! @skipAuth
    quest(id: Int!): Quest @skipAuth
  }

  input CreateQuestInput {
    name: String
    userId: Int!
  }

  input UpdateQuestInput {
    name: String
    userId: Int
  }

  type Mutation {
    createQuest(input: CreateQuestInput!): Quest! @requireAuth
    updateQuest(id: Int!, input: UpdateQuestInput!): Quest! @requireAuth
    deleteQuest(id: Int!): Quest! @requireAuth
  }
`
