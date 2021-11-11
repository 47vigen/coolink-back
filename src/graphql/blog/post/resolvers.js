import { authorOrAdmin, notFound, throwError } from '../../../services/response'
import Post from './model'

const create = (_, { postInput }, { auth }) =>
  Post.create({ ...postInput, user: auth.user })
    .then((post) => post.view(true))
    .then(notFound())
    .catch(throwError())

const show = (_, args, ctx) =>
  Post.find(null, null, { sort: { createdAt: -1 } })
    .then((posts) => posts.map((post) => post.view()))
    .catch(throwError())

const showOne = (_, { slug }, ctx) =>
  Post.findOne({ slug })
    .populate('user')
    .then((post) => (post ? Object.assign(post, { views: post.views + 1 }).save() : null))
    .then((post) => (post ? post.view() : null))
    .then(notFound())
    .catch(throwError())

const update = (_, { id, postInput }, ctx) =>
  Post.findById(id)
    .populate('user')
    .then(notFound())
    .then(authorOrAdmin(ctx, 'user'))
    .then((post) => (post ? Object.assign(post, postInput).save() : null))
    .then((post) => (post ? post.view(true) : null))
    .catch(throwError())

const destroy = (_, { id }, ctx) =>
  Post.findById(id)
    .then(notFound())
    .then(authorOrAdmin(ctx, 'user'))
    .then((post) => (post ? post.remove() : null))
    .catch(throwError())

export const resolvers = {
  Query: {
    showPosts: show,
    showOnePost: showOne
  },

  Mutation: {
    createPost: create,
    updatePost: update,
    destroyPost: destroy
  }
}
