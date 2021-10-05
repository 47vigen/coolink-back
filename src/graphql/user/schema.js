import { gql } from 'mercurius-codegen'

export const schema = gql`
  type Query {
    showMe: User @auth(requires: USER)
  }

  type Mutation {
    createUser(userInput: UserInput!): WithToken
    updateUser(id: ID!, userInput: UserInput!): User @auth(requires: USER)
    destroyUser(id: ID!): User
  }
`
