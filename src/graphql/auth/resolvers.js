import { User } from '../user'
import { sendConfirmMail } from '../../services/email'
import { notFound, throwError } from '../../services/response'
import { sign, signRefresh, signEmail, verifyEmail } from '../../services/jwt'

const login = (_, { userInput: { email, password } }, ctx) =>
  User.findOne({ email })
    .then(notFound('Email not matched with password'))
    .then((user) => user.authenticate(password, user.password))
    .then(notFound('Email not matched with password'))
    .then((user) =>
      signRefresh(user.id)
        .then((tokenRefresh) => {
          ctx.reply.setCookie('refresh', tokenRefresh, {
            httpOnly: true,
            secure: true
          })
          return true
        })
        .then(() => sign(user.id).then((token) => ({ token, user: user.view(true) })))
    )
    .catch(throwError())

const confirmEmail = (_, { token }, ctx) =>
  verifyEmail(token)
    .then(({ id }) => User.findById(id))
    .then(notFound('user not found'))
    .then((user) => {
      if (user?.role === 'USER') {
        return Object.assign(user, { role: 'USER_CONFIRMED' }).save()
      } else {
        throw new Error('User email confirmed!')
      }
    })
    .then((user) =>
      signRefresh(user.id)
        .then((tokenRefresh) => {
          ctx.reply.setCookie('refresh', tokenRefresh, {
            httpOnly: true,
            secure: true
          })
          return true
        })
        .then(() => sign(user.id).then((token) => ({ token, user: user.view(true) })))
    )
    .catch(throwError())

export const sendConfirmEmail = (_, object, { auth }) =>
  signEmail(auth?.user?.id)
    .then((token) => {
      if (auth?.user?.role === 'USER') {
        return sendConfirmMail(auth?.user?.email, token)
      } else {
        throw new Error('User email confirmed!')
      }
    })
    .then(() => true)
    .catch(() => throwError())

export const resolvers = {
  Mutation: {
    login,
    confirmEmail,
    sendConfirmEmail
  }
}
