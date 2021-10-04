import User from './model'
import { sign, signRefresh } from '../../services/jwt'
import { authorOrAdmin, notFound, throwError } from '../../services/response'

// Auth
import { resolvers as authResolvers } from '../auth/resolvers'
const sendConfirmEmail = authResolvers.Mutation.sendConfirmEmail

export const showMe = (_, object, { auth }) => {
  return auth?.user
}

export const create = async (_, { userInput }, ctx) =>
  User.create(userInput)
    .then((user) =>
      signRefresh(user.id)
        .then((tokenRefresh) => {
          ctx.reply.setCookie('refresh', tokenRefresh, {
            httpOnly: true,
            secure: true
          })
          return true
        })
        .then(() =>
          sign(user.id)
            .then((token) => ({ token, user: user.view(true) }))
            .then((withToken) => sendConfirmEmail(null, null, { auth: { user: withToken.user } }).then(() => withToken))
        )
    )
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new Error('email already registered')
      } else {
        throw new Error(err)
      }
    })

const update = (_, { id, userInput }, ctx) =>
  User.findById(id === 'me' ? ctx.auth?.user?.id : id)
    .then(notFound())
    .then(authorOrAdmin(ctx, 'id'))
    .then((user) => (user ? Object.assign(user, userInput).save() : null))
    .then((user) => (user ? user.view(true) : null))
    .catch(throwError())

const destroy = (_, { id }, ctx) =>
  User.findById(id === 'me' ? ctx.auth?.user?.id : id)
    .then(notFound())
    .then(authorOrAdmin(ctx, 'id'))
    .then((user) => (user ? user.remove() : null))
    .catch(throwError())

export const resolvers = {
  Query: {
    showMe
  },
  Mutation: {
    createUser: create,
    updateUser: update,
    destroyUser: destroy
  }
}
