import { sign, signRefresh, signEmail, verifyEmail } from '../../services/jwt'
import { notFound, throwError } from '../../services/response'
import { sendMail } from '../../services/email'
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
    .then(notFound())
    .then((user) => (user ? Object.assign(user, { role: 'USER_CONFIRMED' }).save() : null))
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

const sendConfirmEmail = (_, object, { auth }) =>
  signEmail(auth?.user?.id)
    .then((token) => sendMail(auth?.user?.email, 'ایمیل خود را تایید کنید', `https://coolink.ir/confirm/${token}`))
    .then(() => true)
    .catch(() => throwError())

export const resolvers = {
  Mutation: {
    login,
    confirmEmail,
    sendConfirmEmail
  }
}
