import { throwError, notFound, authorOrAdmin } from '../../services/response/'
import Page from './model'

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

const show = (_, { slug }, ctx) =>
  Page.findOne({ slug })
    .then(notFound())
    .then((page) => (page ? page.view() : null))
    .catch(throwError())

const showById = (_, { id }, ctx) =>
  Page.findById(id)
    .then(notFound())
    .then((page) => (page ? page.view() : null))
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
    showPage: show,
    showPagebyId: showById
  },

  Mutation: {
    createPage: create,
    updatePage: update,
    destroyPage: destroy
  }
}
