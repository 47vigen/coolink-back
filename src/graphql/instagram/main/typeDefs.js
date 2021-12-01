import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    showOneFeedByPk(pk: String!): Boolean
    showIGFeedsByPage(page: ID!, next: String): PageFeeds
  }

  type Mutation {
    showIGInfoByUsername(username: String!): PageInfo @auth(requires: USER_CONFIRMED)
    # sendFollowRequest(pk: String!): FollowRequest! @auth(requires: USER_CONFIRMED)
  }
`
