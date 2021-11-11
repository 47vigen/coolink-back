import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  scalar Upload

  type Mutation {
    uploadImage(type: UploadType!, pk: String!, image: Upload!): String! @auth(requires: USER_CONFIRMED)
  }
`
