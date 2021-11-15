import { gql } from 'mercurius-codegen'

export const types = gql`
  type Post {
    id: ID!
    user: User!
    views: Int!
    body: String!
    slug: String!
    cover: String!
    title: String!
    subTitle: String
    attachment: String
    createdAt: String!
  }

  type Comment {
    id: ID!
    user: User!
    body: String!
    replies: [Comment!]
    createdAt: String!
  }
`
