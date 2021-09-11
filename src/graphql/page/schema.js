import { gql } from 'mercurius-codegen'

export const schema = gql`
  type Query {
    showPage(slug: String!): Page
    showMyPages: [Page!]
  }

  type Mutation {
    createPage(pageInput: PageInput!): Page
    updatePage(id: ID!, pageInput: PageInput!): Page
    destroyPage(id: ID!): Page
  }
`
