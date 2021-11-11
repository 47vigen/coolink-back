import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    showComments(post: ID!): [Comment!]
  }

  type Mutation {
    createComment(commentInput: CommentInput!): Comment @auth(requires: USER_CONFIRMED)
    updateComment(id: ID!, commentInput: CommentInput!): Comment @auth(requires: USER_CONFIRMED)
    destroyComment(id: ID!): Comment @auth(requires: USER_CONFIRMED)
  }
`
