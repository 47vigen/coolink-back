import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    isShortLinkSlugExist(slug: String!): Boolean! @auth(requires: USER_CONFIRMED)
    showShortLinkBySlug(slug: String!): ShortLink
    showMyShortLinks: [ShortLink!] @auth(requires: USER)
  }

  type Mutation {
    createShortLink(shortLinkInput: ShortLinkInput!): ShortLink @auth(requires: USER_CONFIRMED)
    updateShortLink(id: ID!, shortLinkInput: ShortLinkInput!): ShortLink @auth(requires: USER_CONFIRMED)
    destroyShortLink(id: ID!): ShortLink @auth(requires: USER_CONFIRMED)
  }
`
