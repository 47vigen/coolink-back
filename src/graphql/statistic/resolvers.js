import { throwError, notFound, authorOrAdmin } from '../../services/response'
import requestIp from 'request-ip'

import Statistic from './model'
import Page from '../page/model'

const create = (_, { statisticInput }, { reply }) =>
  Statistic.create({ ...statisticInput, ip: requestIp.getClientIp(reply.request) })
    .then((statistic) => statistic.view())
    .then(notFound())
    .catch(throwError())

const showByPage = (_, { page, days = 'for7' }, ctx) =>
  Page.findById(page)
    .populate('user')
    .then(notFound())
    .then(authorOrAdmin(ctx, 'user'))
    .then((page) => {
      const currentDays = Number(days.replace('for', '')) || 7
      if (page) {
        return Statistic.find({ page, createdAt: { $gte: new Date(Date.now() - 60 * 60 * 24 * currentDays * 1000) } }, null, {
          sort: { createdAt: -1 }
        })
          .then((statistics) => statistics.map((statistic) => statistic.view()))
          .catch(throwError())
      } else return null
    })
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
