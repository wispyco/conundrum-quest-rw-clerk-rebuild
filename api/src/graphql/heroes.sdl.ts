export const schema = gql`
  type Hero {
    id: Int!
    name: String
    questId: Int!
    quests: [Quest]!
  }

  type Query {
    heroes: [Hero!]! @requireAuth
    hero(id: Int!): Hero @requireAuth
  }

  input CreateHeroInput {
    name: String
    questId: Int!
  }

  input UpdateHeroInput {
    name: String
    questId: Int
  }

  type Mutation {
    createHero(input: CreateHeroInput!): Hero! @requireAuth
    updateHero(id: Int!, input: UpdateHeroInput!): Hero! @requireAuth
    deleteHero(id: Int!): Hero! @requireAuth
  }
`
