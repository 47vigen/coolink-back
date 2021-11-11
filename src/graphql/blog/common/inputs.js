import { gql } from 'mercurius-codegen'

export const inputs = gql`
  input PostInput {
    body: String!
    slug: String!
    cover: String!
    title: String!
    subTitle: String
    attachment: String
  }

  input CommentInput {
    post: ID!
    body: String!
    repliedTo: ID
  }
`
