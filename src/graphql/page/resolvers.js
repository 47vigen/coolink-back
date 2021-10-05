import { throwError, notFound, authorOrAdmin } from '../../services/response/'
import Page from './model'

// Sections
import { resolvers as sectionResolvers } from '../section'
const showSection = sectionResolvers.Query.showSection

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

export const resolvers = {
  Query: {
    showPageWithSections: showWithSections,
    showMyPages: showMy
  },

  Mutation: {
    createPage: create,
    updatePage: update,
    destroyPage: destroy
  }
}
