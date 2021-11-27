import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    showIGFeedsByPage(page: String!, next: String): PageFeeds
  }

  type Mutation {
    showIGInfoByUsername(username: String!): PageInfo @auth(requires: USER_CONFIRMED)
    # sendFollowRequest(pk: String!): FollowRequest! @auth(requires: USER_CONFIRMED)
  }
`
