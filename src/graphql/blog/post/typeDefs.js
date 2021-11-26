import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    showPosts: [Post!]
    showPostBySlug(slug: String!): Post
  }

  type Mutation {
    createPost(postInput: PostInput!): Post @auth(requires: ADMIN)
    updatePost(id: ID!, postInput: PostInput!): Post @auth(requires: ADMIN)
    destroyPost(id: ID!): Post @auth(requires: ADMIN)
  }
`
