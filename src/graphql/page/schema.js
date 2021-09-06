import { gql } from 'mercurius-codegen'

export const schema = gql`
  type Query {
    showPage(slug: String!): Page
    showPagebyId(id: ID!): Page
  }

  type Mutation {
    createPage(pageInput: PageInput!): Page
  }
`
