import ShortLink from '.'
import { throwError, notFound, authorOrAdmin } from '../../services/response/'

const create = (_, { shortLinkInput }, { auth }) =>
  ShortLink.create({ ...shortLinkInput, user: auth.user })
    .then((shortLink) => shortLink.view(true))
    .then(notFound())
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new Error('slug already registered')
      } else {
        throw new Error(err)
      }
    })

const update = (_, { id, shortLinkInput }, ctx) =>
  ShortLink.findById(id)
    .populate('user')
    .then(notFound())
    .then(authorOrAdmin(ctx, 'user'))
    .then((shortLink) => (shortLink ? Object.assign(shortLink, shortLinkInput).save() : null))
    .then((shortLink) => (shortLink ? shortLink.view(true) : null))
    .catch(throwError())

const destroy = (_, { id }, ctx) =>
  ShortLink.findById(id)
    .then(notFound())
    .then(authorOrAdmin(ctx, 'user'))
    .then((shortLink) => (shortLink ? shortLink.remove() : null))
    .catch(throwError())

const isSlugExist = (_, { slug }, ctx) =>
  ShortLink.findOne({ slug })
    .then((shortLink) => !!shortLink)
    .catch(throwError())

const showMy = (_, args, { auth }) =>
  ShortLink.find({ user: auth.user })
    .sort({ createdAt: -1 })
    .then((shortLinks) => shortLinks.map((shortLinks) => shortLinks.view()))
    .catch(throwError())

const showBySlug = (_, { slug }, ctx) =>
  ShortLink.findOne({ slug })
    .then(notFound())
    .then((shortLink) => (shortLink ? shortLink.view() : null))
    .catch(throwError())

export const resolvers = {
  Query: {
    showMyShortLinks: showMy,
    showShortLinkBySlug: showBySlug,
    isShortLinkSlugExist: isSlugExist
  },

  Mutation: {
    createShortLink: create,
    updateShortLink: update,
    destroyShortLink: destroy
  }
}
