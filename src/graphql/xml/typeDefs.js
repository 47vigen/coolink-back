import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    showXml: [Xml!]
  }
`
