import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import { jwtSecret } from '../../config'
import User from '../../graphql/user/model'

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

export const sign = (id, options, method = jwtSign) => method({ id }, jwtSecret, options)

export const signSync = (id, options) => sign(id, options, jwt.sign)

export const verify = (token) => jwtVerify(token, jwtSecret)

export const useToken = async (context) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const token = context.reply.request.headers.authorization?.replace('Bearer ', '')
    const { id } = await verify(token)
    const user = await User.findById(id)

    return user
  } catch (err) {
    throw err
  }
}
