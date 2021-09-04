import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import { jwtSecret, jwtRefreshSecret } from '../../config'
import User from '../../graphql/user/model'

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

export const sign = (id, options, method = jwtSign) => method({ id }, jwtSecret, { expiresIn: '30m', ...options })

export const signRefresh = (id, options, method = jwtSign) => method({ id }, jwtRefreshSecret, { expiresIn: '7d', ...options })

export const signSync = (id, options) => sign(id, options, jwt.sign)

export const verify = (token) => jwtVerify(token, jwtSecret)

export const verifyRefresh = (token) => jwtVerify(token, jwtRefreshSecret)

export const isAuth = async (context) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const token = context.reply.request.headers.authorization?.slice('Bearer ')[1]
    if (!token) return null

    const { id } = await verify(token)
    const user = await User.findById(id)

    return user
  } catch (err) {
    throw err
  }
}
