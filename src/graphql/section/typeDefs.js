import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Mutation {
    createSection(sectionInput: SectionInput!): Section @auth(requires: USER_CONFIRMED)
    updateSection(id: ID!, sectionInput: SectionInput!): Section @auth(requires: USER_CONFIRMED)
    saveManySections(sections: [SectionManyInput!]): [Section!] @auth(requires: USER_CONFIRMED)
    destroySection(id: ID!): Section @auth(requires: USER_CONFIRMED)
  }
`
