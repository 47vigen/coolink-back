import { gql } from 'mercurius-codegen'

export const schema = gql`
  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER_CONFIRMED
    USER
    UNKNOWN
  }

  type Mutation {
    login(userInput: UserInput!): WithToken
    confirmEmail(token: String!): WithToken
    sendConfirmEmail: Boolean @auth(requires: USER)
  }
`
