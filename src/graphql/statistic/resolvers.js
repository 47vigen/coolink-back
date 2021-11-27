import { Statistic } from '.'
import { Page } from '../page'
import requestIp from 'request-ip'
import { throwError, notFound, authorOrAdmin } from '../../services/response'

const create = (_, { statisticInput }, { reply }) =>
  Statistic.create({ ...statisticInput, ip: requestIp.getClientIp(reply.request) })
    .then((statistic) => statistic.view())
    .then(notFound())
    .catch(throwError())

const showByPage = (_, { page, days = 'for7' }, ctx) =>
  Page.findById(page)
    .populate('user')
    .then(notFound('page not found'))
    .then(authorOrAdmin(ctx, 'user'))
    .then((page) =>
      Statistic.find({ page, createdAt: { $gte: new Date(Date.now() - 60 * 60 * 24 * (Number(days.replace('for', '')) || 7) * 1000) } })
        .sort({ createdAt: -1 })
        .then((statistics) => statistics?.map((statistic) => statistic.view()))
        .catch(throwError())
    )
    .catch(throwError())

export const show30Days = () =>
  Statistic.find({ createdAt: { $gte: new Date(Date.now() - 60 * 60 * 24 * 30 * 1000) } })
    .sort({ createdAt: -1 })
    .catch(throwError())

export const resolvers = {
  Query: {
    showStatisticsByPage: showByPage
  },
  Mutation: {
    createStatistic: create
  }
}
