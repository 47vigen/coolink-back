import { gql } from 'mercurius-codegen'

export const schema = gql`
  type Query {
    showSection(page: String!): [Section!]
  }

  type Mutation {
    createSection(sectionInput: SectionInput!): Section
    updateSection(id: ID!, sectionInput: SectionInput!): Section
    updateInsertManySections(sections: [SectionManyInput!]): [Section!]
    destroySection(id: ID!): Section
  }
`
