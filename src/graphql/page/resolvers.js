import { Page } from '.'
import { Section } from '../section'
import { throwError, notFound, authorOrAdmin } from '../../services/response/'

// Statistics
import { show30Days as show30DaysStatistics } from '../statistic/resolvers'

// Utils
import toppest from '../../utils/toppest'

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

const update = (_, { id, pageInput }, ctx) =>
  Page.findById(id)
    .populate('user')
    .then(notFound('page not found'))
    .then(authorOrAdmin(ctx, 'user'))
    .then((page) => Object.assign(page, pageInput).save())
    .then((page) => page.view(true))
    .catch(throwError())

const destroy = (_, { id }, ctx) =>
  Page.findById(id)
    .then(notFound('page not found'))
    .then(authorOrAdmin(ctx, 'user'))
    .then((page) => page.remove())
    .catch(throwError())

const isSlugExist = (_, { slug }, ctx) =>
  Page.findOne({ slug })
    .then((page) => !!page)
    .catch(throwError())

const showMy = (_, args, { auth }) =>
  Page.find({ user: auth.user })
    .sort({ createdAt: -1 })
    .then((pages) => pages?.map((page) => page.view()))
    .catch(throwError())

const showTrendTemplates = (_, args, ctx) =>
  show30DaysStatistics()
    .then((statistics) => (statistics?.length ? toppest(statistics, 'page', true) : null))
    .then((tops) => tops?.map((top) => top.key))
    .then(notFound('toppest pages not found'))
    .then((pages) => Promise.all(pages.map(async (page) => await Page.findById(page))))
    .then((pages) => pages.map((page) => page?.template()))
    .then((pages) => pages.filter((page) => page?.id).slice(0, 10))
    .then(notFound())
    .catch(throwError())

const showLastTemplates = (_, args, ctx) =>
  Page.find()
    .sort({ updatedAt: -1 })
    .limit(10)
    .then(notFound())
    .then((pages) => pages?.map((pages) => pages.template()))
    .catch(throwError())

const showWithSectionsBySlug = (_, { slug }, ctx) =>
  Page.findOne({ slug })
    .then(notFound('page not found'))
    .then((page) =>
      Section.find({ page }, null, { sort: { position: 1 } })
        .then(notFound())
        .then((sections) => ({ page: page.view(), sections: sections?.map((section) => section.view()) }))
        .catch(throwError())
    )
    .catch(throwError())

export const resolvers = {
  Query: {
    showLastTemplates,
    showTrendTemplates,
    showMyPages: showMy,
    isPageSlugExist: isSlugExist,
    showPageWithSectionsBySlug: showWithSectionsBySlug
  },

  Mutation: {
    createPage: create,
    updatePage: update,
    destroyPage: destroy
  }
}
