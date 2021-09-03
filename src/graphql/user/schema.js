import { gql } from 'mercurius-codegen'

export const schema = gql`
  type Query {
    showMe: User @auth(requires: USER)
  }

  type Mutation {
    createUser(userInput: UserInput!): WithToken
  }
`
