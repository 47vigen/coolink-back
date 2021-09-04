import { sign, signRefresh } from '../../services/jwt'
import User from '../user/model'

const login = async (_, { userInput: { email, password } }, ctx) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Email not matched with password')
    }

    const validUser = await user.authenticate(password, user.password)
    if (!validUser) {
      throw new Error('Email not matched with password')
    }

    const token = await sign(validUser.id)

    const tokenRefresh = await signRefresh(validUser.id)
    ctx.reply.setCookie('refresh', tokenRefresh, {
      httpOnly: true
    })

    return { token, user }
  } catch (err) {
    throw new Error(err)
  }
}

export const resolvers = {
  Mutation: {
    login
  }
}
