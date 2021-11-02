import { gql } from 'mercurius-codegen'

export const schema = gql`
  type Query {
    showStatisticsByPage(page: String!): [Statistic!] @auth(requires: USER)
  }

  type Mutation {
    createStatistic(statisticInput: StatisticInput!): Statistic
  }
`
