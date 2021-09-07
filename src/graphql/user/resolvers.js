import User from './model'
import { sign, signRefresh } from '../../services/jwt'

export const showMe = (parent, object, { auth }) => {
  return auth?.user
}

export const create = async (_, { userInput }, ctx) =>
  User.create(userInput)
    .then((user) => {
      signRefresh(user.id)
        .then((tokenRefresh) =>
          ctx.reply.setCookie('refresh', tokenRefresh, {
            httpOnly: true
          })
        )
        .then(() => sign(user.id).then((token) => ({ token, user: user.view(true) })))
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new Error('email already registered')
      } else {
        throw new Error(err)
      }
    })

export const resolvers = {
  Query: {
    showMe
  },
  Mutation: {
    createUser: create
  }
}
