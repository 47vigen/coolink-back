import { throwError, notFound } from '../../services/response'
import Statistic from './model'

const create = (_, { StatisticInput }, { auth }) =>
  Statistic.create(StatisticInput)
    .then((statistic) => statistic.view())
    .then(notFound())
    .catch(throwError())

const showByPage = (_, { page }, ctx) =>
  Statistic.find({ page }, null, { sort: { position: 1 } })
    .then((statistics) => statistics.map((statistic) => statistic.view()))
    .catch(throwError())

export const resolvers = {
  Query: {
    showStatisticsByPage: showByPage
  },
  Mutation: {
    createStatistic: create
  }
}
