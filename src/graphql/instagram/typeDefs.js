import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    getPageFeeds(pk: String!, next: String): PageFeeds
  }

  type Mutation {
    getPageInfo(username: String!): PageInfo @auth(requires: USER_CONFIRMED)
    sendFollowRequest(pk: String!): FollowRequest! @auth(requires: USER_CONFIRMED)
  }
`
