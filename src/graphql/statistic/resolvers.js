import requestIp from 'request-ip'

import Statistic from './model'
import { throwError, notFound } from '../../services/response'

const create = (_, { statisticInput }, { reply }) =>
  Statistic.create({ ...statisticInput, ip: requestIp.getClientIp(reply.request) })
    .then((statistic) => statistic.view())
    .then(notFound())
    .catch(throwError())

const showByPage = (_, { page }, ctx) =>
  Statistic.find({ page }, null, { sort: { createdAt: -1 } })
    .then((statistics) => statistics.map((statistic) => statistic.view()))
    .catch(throwError())

export const showLast30Days = () => Statistic.find({ createdAt: { $gte: new Date(Date.now() - 60 * 60 * 24 * 30 * 1000) } }).catch(throwError())

export const resolvers = {
  Query: {
    showStatisticsByPage: showByPage
  },
  Mutation: {
    createStatistic: create
  }
}
