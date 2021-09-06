import { gql } from 'mercurius-codegen'

export const inputSchema = gql`
  input UserInput {
    name: String
    picture: String
    email: String!
    password: String!
  }

  input PageInput {
    pk: String!
    slug: String!
    title: String!
    subTitle: String
    profilePic: String
  }
`
