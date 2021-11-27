import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER_CONFIRMED
    USER
    UNKNOWN
  }

  type Mutation {
    logout: Boolean!
    login(userInput: UserInput!): WithToken
    confirmEmail(token: String!): WithToken
    sendConfirmEmail: Boolean @auth(requires: USER)
  }
`
