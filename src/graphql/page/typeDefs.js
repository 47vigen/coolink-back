import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    showMyPages: [Page!] @auth(requires: USER)
    isPageSlugExist(slug: String!): Boolean! @auth(requires: USER_CONFIRMED)
    showLastTemplates: [Template!] @auth(requires: USER_CONFIRMED)
    showTrendTemplates: [Template!] @auth(requires: USER_CONFIRMED)
    showPageWithSectionsBySlug(slug: String!): PageWithSections
  }

  type Mutation {
    createPage(pageInput: PageInput!): Page @auth(requires: USER_CONFIRMED)
    updatePage(id: ID!, pageInput: PageInput!): Page @auth(requires: USER_CONFIRMED)
    destroyPage(id: ID!): Page @auth(requires: USER_CONFIRMED)
  }
`
