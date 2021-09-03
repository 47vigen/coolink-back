import { gql } from 'mercurius-codegen'

export const schema = gql`
  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
    UNKNOWN
  }

  type Mutation {
    login(userInput: UserInput!): WithToken
  }
`
