import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    searchFeeds(q: String!, pagePk: String!): [Feed!]
    showPageWithFeedsSectionBySlug(slug: String!): PageWithFeedsSection
    showOneFeedWithPageSection(slug: String!, pk: String!): FeedWithPageSection
  }

  type Mutation {
    destroyFeed(id: ID!): Feed @auth(requires: USER_CONFIRMED)
  }
`
