import { sign, signRefresh } from '../../services/jwt'
import { notFound, throwError } from '../../services/response'
import User from '../user/model'

const login = (_, { userInput: { email, password } }, ctx) =>
  User.findOne({ email })
    .then(notFound('Email not matched with password'))
    .then((user) => user.authenticate(password, user.password))
    .then(notFound('Email not matched with password'))
    .then((user) =>
      signRefresh(user.id)
        .then((tokenRefresh) => {
          ctx.reply.setCookie('refresh', tokenRefresh, {
            httpOnly: true
          })
          return true
        })
        .then(() => sign(user.id).then((token) => ({ token, user: user.view(true) })))
    )
    .catch(throwError())

export const resolvers = {
  Mutation: {
    login
  }
}
