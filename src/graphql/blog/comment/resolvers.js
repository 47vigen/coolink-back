import { authorOrAdmin, notFound, throwError } from '../../../services/response'
import Comment from './model'

const create = (_, { commentInput }, { auth }) =>
  Comment.create({ ...commentInput, user: auth.user })
    .then((comment) => comment.view())
    .then(notFound())
    .then((comment) => (commentInput.repliedTo ? addReplies(commentInput.repliedTo, comment) : comment))
    .catch(throwError())

const show = (_, { post }, ctx) =>
  Comment.find({ post, status: 1, repliedTo: null }, null, { sort: { createdAt: -1 } })
    .populate('user')
    .populate('replies')
    .then((comments) => comments.map((comment) => comment.view()))
    .catch(throwError())

const addReplies = (repliedTo, newComment) =>
  Comment.findById(repliedTo)
    .then((comment) => {
      if (comment?.repliedTo) {
        throw new Error('you cant reply this comment')
      } else return comment
    })
    .then((comment) => (comment ? Object.assign(comment, { replies: [...comment.replies, newComment.id] }).save() : null))
    .then(() => newComment)
    .catch(throwError())

const update = (_, { id, commentInput }, ctx) =>
  Comment.findById(id)
    .populate('user')
    .then(notFound())
    .then(authorOrAdmin(ctx, 'user'))
    .then((comment) => (comment ? Object.assign(comment, commentInput).save() : null))
    .then((comment) => (comment ? comment.view(true) : null))
    .catch(throwError())

const destroy = (_, { id }, ctx) =>
  Comment.findById(id)
    .then(notFound())
    .then(authorOrAdmin(ctx, 'user'))
    .then((comment) => (comment ? comment.remove() : null))
    .catch(throwError())

export const resolvers = {
  Query: {
    showComments: show
  },

  Mutation: {
    createComment: create,
    updateComment: update,
    destroyComment: destroy
  }
}
