import Page from './model'
import { throwError, notFound, authorOrAdmin } from '../../services/response/'

// Statistics
import { showLast30Days as showStatisticsLast30Days } from '../statistic/resolvers'

// Utils
import toppest from '../../utils/toppest'

// Sections
import { resolvers as sectionResolvers } from '../section'
const showSection = sectionResolvers.Query.showSection

const isSlugExist = (_, { slug }, ctx) =>
  Page.findOne({ slug })
    .then((page) => !!page)
    .catch(throwError())

const create = (_, { pageInput }, { auth }) =>
  Page.create({ ...pageInput, user: auth.user })
    .then((page) => page.view(true))
    .then(notFound())
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new Error('slug already registered')
      } else {
        throw new Error(err)
      }
    })

const showWithSections = (_, { slug }, ctx) =>
  Page.findOne({ slug })
    .then(notFound())
    .then((page) => (page ? page.view() : null))
    .then((page) => {
      if (page?.id) {
        return showSection(_, { page: page.id }, ctx)
          .then((sections) => ({ page, sections }))
          .catch(throwError())
      } else return null
    })
    .catch(throwError())

const showMy = (_, args, { auth }) =>
  Page.find({ user: auth.user })
    .sort({ createdAt: -1 })
    .then((pages) => pages.map((pages) => pages.view()))
    .catch(throwError())

const update = (_, { id, pageInput }, ctx) =>
  Page.findById(id)
    .populate('user')
    .then(notFound())
    .then(authorOrAdmin(ctx, 'user'))
    .then((page) => (page ? Object.assign(page, pageInput).save() : null))
    .then((page) => (page ? page.view(true) : null))
    .catch(throwError())

const destroy = (_, { id }, ctx) =>
  Page.findById(id)
    .then(notFound())
    .then(authorOrAdmin(ctx, 'user'))
    .then((page) => (page ? page.remove() : null))
    .catch(throwError())

const showTrendTemplates = (_, args, ctx) =>
  showStatisticsLast30Days()
    .then((statistics) => (statistics.length ? toppest(statistics, 'page', true) : null))
    .then((tops) => tops.map((top) => top.key)?.slice(0, 10))
    .then(notFound())
    .then((pages) => Promise.all(pages.map((page) => Page.findById(page))))
    .then((pages) => pages.map((pages) => pages.template()))
    .catch(throwError())

const showLastTemplates = (_, args, ctx) =>
  Page.find()
    .sort({ updatedAt: -1 })
    .limit(10)
    .then(notFound())
    .then((pages) => pages.map((pages) => pages.template()))
    .catch(throwError())

export const resolvers = {
  Query: {
    isSlugExist,
    showPageWithSections: showWithSections,
    showMyPages: showMy,
    showTrendTemplates,
    showLastTemplates
  },

  Mutation: {
    createPage: create,
    updatePage: update,
    destroyPage: destroy
  }
}
