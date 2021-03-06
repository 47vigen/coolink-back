import { gql } from 'mercurius-codegen'

export const typeDefs = gql`
  type Query {
    showStatisticsByPage(page: String!, days: DaysType): [Statistic!] @auth(requires: USER_CONFIRMED)
  }

  type Mutation {
    createStatistic(statisticInput: StatisticInput!): Statistic
  }
`
