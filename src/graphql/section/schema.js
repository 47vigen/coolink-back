import { gql } from 'mercurius-codegen'

export const schema = gql`
  type Query {
    showSection(page: String!): [Section!]
  }

  type Mutation {
    createSection(sectionInput: SectionInput!): Section
  }
`
