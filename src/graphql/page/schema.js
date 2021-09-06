import { gql } from 'mercurius-codegen'

export const schema = gql`
  type Mutation {
    createPage(pageInput: PageInput!): Page
  }
`
