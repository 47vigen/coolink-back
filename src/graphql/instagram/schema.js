import { gql } from 'mercurius-codegen'

export const schema = gql`
  type Mutation {
    getPageInfo(username: String!): PageInfo
  }
`