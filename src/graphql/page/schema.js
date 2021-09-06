import { gql } from 'mercurius-codegen'

export const schema = gql`
  type Query {
    showPagebyId(id: ID!): Page
  }

  type Mutation {
    createPage(pageInput: PageInput!): Page
  }
`
