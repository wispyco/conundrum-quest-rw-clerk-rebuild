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
    quests: [Quest!]! @requireAuth
    quest(id: Int!): Quest @requireAuth
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
