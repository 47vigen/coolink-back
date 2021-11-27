import { Post } from '.'
import { authorOrAdmin, notFound, throwError } from '../../../services/response'

const create = (_, { postInput }, { auth }) =>
  Post.create({ ...postInput, user: auth.user })
    .then((post) => post.view(true))
    .then(notFound())
    .catch(throwError())

const update = (_, { id, postInput }, ctx) =>
  Post.findById(id)
    .populate('user')
    .then(notFound('post not found'))
    .then(authorOrAdmin(ctx, 'user'))
    .then((post) => Object.assign(post, postInput).save())
    .then((post) => post.view(true))
    .catch(throwError())

const destroy = (_, { id }, ctx) =>
  Post.findById(id)
    .then(notFound('post not found'))
    .then(authorOrAdmin(ctx, 'user'))
    .then((post) => (post ? post.remove() : null))
    .catch(throwError())

const show = (_, args, ctx) =>
  Post.find(null, null, { sort: { createdAt: -1 } })
    .populate('user')
    .then((posts) => posts?.map((post) => post.view()))
    .catch(throwError())

const showBySlug = (_, { slug }, ctx) =>
  Post.findOne({ slug })
    .populate('user')
    .then(notFound('post not found'))
    .then((post) => Object.assign(post, { views: post.views + 1 }).save())
    .then((post) => post.view())
    .catch(throwError())

export const resolvers = {
  Query: {
    showPosts: show,
    showPostBySlug: showBySlug
  },

  Mutation: {
    createPost: create,
    updatePost: update,
    destroyPost: destroy
  }
}
