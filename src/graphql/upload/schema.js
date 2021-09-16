import { gql } from 'mercurius-codegen'

export const schema = gql`
  scalar Upload

  type Mutation {
    uploadImage(type: UploadType!, pk: String!, image: Upload!): String!
  }
`
