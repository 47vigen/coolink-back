import Promise from 'bluebird'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { jwtSecret, jwtRefreshSecret, jwtEmailSecret } from '../../config'
import User from '../../graphql/user/model'

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

export const sign = (id, options, method = jwtSign) => method({ id }, jwtSecret, { expiresIn: '30m', ...options })

export const signRefresh = (id, options, method = jwtSign) => method({ id }, jwtRefreshSecret, { expiresIn: '7d', ...options })

export const signEmail = (id, options, method = jwtSign) => method({ id }, jwtEmailSecret, { expiresIn: '10m', ...options })

export const signSync = (id, options) => sign(id, options, jwt.sign)

export const verify = (token) => jwtVerify(token, jwtSecret)

export const verifyRefresh = (token) => jwtVerify(token, jwtRefreshSecret)

export const verifyEmail = (token) => jwtVerify(token, jwtEmailSecret)

export const isAuth = async (context) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const token = context.reply.request.headers.authorization?.split('Bearer ')[1]
    if (!token) return null

    const { id } = await verify(token)
    const user = await User.findById(id)

    return user
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return null
    } else throw new Error(err)
  }
}

export const refreshToken = async (req, reply) => {
  try {
    const refresh = req.cookies.refresh
    const { id } = await verifyRefresh(refresh)

    const user = await User.findById(id)
    if (!user) reply.code(401).send('user not authorized')

    const token = await sign(user.id)

    reply.code(200).send({ token })
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      reply.code(401).send('you most relogin')
    } else throw new Error(err)
  }
}
