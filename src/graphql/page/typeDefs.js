import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    isSlugExist(slug: String!): Boolean! @auth(requires: USER_CONFIRMED)
    showPageWithSections(slug: String!): PageWithSections
    showMyPages: [Page!] @auth(requires: USER)
    showTrendTemplates: [Template!] @auth(requires: USER_CONFIRMED)
    showLastTemplates: [Template!] @auth(requires: USER_CONFIRMED)
  }

  type Mutation {
    createPage(pageInput: PageInput!): Page @auth(requires: USER_CONFIRMED)
    updatePage(id: ID!, pageInput: PageInput!): Page @auth(requires: USER_CONFIRMED)
    destroyPage(id: ID!): Page @auth(requires: USER_CONFIRMED)
  }
`