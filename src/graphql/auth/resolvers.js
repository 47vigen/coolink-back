// import { success } from "../../services/response/";
import { sign } from '../../services/jwt'
import User from '../user/model'

const login = async (_, { userInput: { email, password } }) => {
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
    return { token, user }
  } catch (_err) {
    throw new Error('Email not matched with password')
  }
}

export const resolvers = {
  Mutation: {
    login
  }
}
