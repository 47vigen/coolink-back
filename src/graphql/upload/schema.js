import { gql } from 'mercurius-codegen'

export const schema = gql`
  scalar Upload

  type Mutation {
    uploadImage(pk: String!, image: Upload!): String!
  }
`
