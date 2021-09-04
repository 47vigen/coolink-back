import { gql } from 'mercurius-codegen'

export const typeSchema = gql`
  type WithToken {
    token: String!
    user: User
  }

  type User {
    id: ID!
    name: String
    picture: String
    email: String!
  }

  type PageInfo {
    pk: ID!
    fullName: String!
    profilePic: String
  }
`
