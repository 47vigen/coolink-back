import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    showIGFeeds(pk: String!, next: String): PageFeeds
  }

  type Mutation {
    showIGInfo(username: String!): PageInfo @auth(requires: USER_CONFIRMED)
    # sendFollowRequest(pk: String!): FollowRequest! @auth(requires: USER_CONFIRMED)
  }
`
