import { Comment } from '.'
import { authorOrAdmin, notFound, throwError } from '../../../services/response'

const create = (_, { commentInput }, { auth }) =>
  Comment.create({ ...commentInput, user: auth.user })
    .then((comment) => comment.view())
    .then(notFound())
    .then((comment) => (commentInput.repliedTo ? addReplies(commentInput.repliedTo, comment) : comment))
    .catch(throwError())

const addReplies = (repliedTo, newComment) =>
  Comment.findById(repliedTo)
    .then(notFound('comment not found'))
    .then((comment) => {
      if (comment?.repliedTo) {
        throw new Error('you cant reply this comment')
      } else return comment
    })
    .then((comment) => Object.assign(comment, { replies: [...comment.replies, newComment.id] }).save())
    .then(() => newComment)
    .catch(throwError())

const update = (_, { id, commentInput }, ctx) =>
  Comment.findById(id)
    .populate('user')
    .then(notFound('comment not found'))
    .then(authorOrAdmin(ctx, 'user'))
    .then((comment) => Object.assign(comment, commentInput).save())
    .then((comment) => comment.view(true))
    .catch(throwError())

const destroy = (_, { id }, ctx) =>
  Comment.findById(id)
    .then(notFound('comment not found'))
    .then(authorOrAdmin(ctx, 'user'))
    .then((comment) => comment.remove())
    .catch(throwError())

const showByPost = (_, { post }, ctx) =>
  Comment.find({ post, status: 1, repliedTo: null }, null, { sort: { createdAt: -1 } })
    .populate('user')
    .populate('replies')
    .then((comments) => comments?.map((comment) => comment.view()))
    .catch(throwError())

export const resolvers = {
  Query: {
    showCommentsByPost: showByPost
  },

  Mutation: {
    createComment: create,
    updateComment: update,
    destroyComment: destroy
  }
}
