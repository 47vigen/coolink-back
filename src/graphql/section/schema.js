import { gql } from 'mercurius-codegen'

export const schema = gql`
  type Query {
    showSection(page: String!): [Section!]
  }

  type Mutation {
    createSection(sectionInput: SectionInput!): Section @auth(requires: USER_CONFIRMED)
    updateSection(id: ID!, sectionInput: SectionInput!): Section @auth(requires: USER_CONFIRMED)
    updateInsertManySections(sections: [SectionManyInput!]): [Section!] @auth(requires: USER_CONFIRMED)
    destroySection(id: ID!): Section @auth(requires: USER_CONFIRMED)
  }
`
