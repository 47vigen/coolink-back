import { gql } from 'mercurius-codegen'

export const schema = gql`
  type Query {
    getPageFeeds(pk: String!, next: String): PageFeeds
  }

  type Mutation {
    getPageInfo(username: String!): PageInfo
    sendFollowRequest(pk: String!): FollowRequest!
  }
`
