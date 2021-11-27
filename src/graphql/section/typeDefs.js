import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Mutation {
    saveManySections(sections: [SectionManyInput!]): [Section!] @auth(requires: USER_CONFIRMED)
    destroySection(id: ID!): Section @auth(requires: USER_CONFIRMED)
  }
`
