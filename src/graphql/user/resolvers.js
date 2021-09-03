// import { success, notFound } from "../../services/response/";
import User from './model'
import { sign } from '../../services/jwt'

// export const index = ({ querymen: { query, select, cursor } }, res, next) =>
//     User.count(query)
//         .then((count) =>
//             User.find(query, select, cursor).then((users) => ({
//                 rows: users.map((user) => user.view()),
//                 count,
//             }))
//         )
//         .then(success(res))
//         .catch(next);

// export const show = ({ params }, res, next) =>
//     User.findById(params.id)
//         .then(notFound(res))
//         .then((user) => (user ? user.view() : null))
//         .then(success(res))
//         .catch(next);

export const showMe = (parent, object, { auth }) => {
  return auth?.user
}

export const create = async (_, { userInput }) => {
  try {
    const user = await User.create(userInput)
    const token = await sign(user.id)
    return { token, user: user.view(true) }
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      throw new Error('email already registered')
    } else {
      throw new Error(err)
    }
  }
}

// export const update = ({ bodymen: { body }, params, user }, res, next) =>
//     User.findById(params.id === "me" ? user.id : params.id)
//         .then(notFound(res))
//         .then((result) => {
//             if (!result) return null;
//             const isAdmin = user.role === "admin";
//             const isSelfUpdate = user.id === result.id;
//             if (!isSelfUpdate && !isAdmin) {
//                 res.status(401).json({
//                     valid: false,
//                     message: "You can't change other user's data",
//                 });
//                 return null;
//             }
//             return result;
//         })
//         .then((user) => (user ? Object.assign(user, body).save() : null))
//         .then((user) => (user ? user.view(true) : null))
//         .then(success(res))
//         .catch(next);

// export const updatePassword = (
//     { bodymen: { body }, params, user },
//     res,
//     next
// ) =>
//     User.findById(params.id === "me" ? user.id : params.id)
//         .then(notFound(res))
//         .then((result) => {
//             if (!result) return null;
//             const isSelfUpdate = user.id === result.id;
//             if (!isSelfUpdate) {
//                 res.status(401).json({
//                     valid: false,
//                     param: "password",
//                     message: "You can't change other user's password",
//                 });
//                 return null;
//             }
//             return result;
//         })
//         .then((user) =>
//             user ? user.set({ password: body.password }).save() : null
//         )
//         .then((user) => (user ? user.view(true) : null))
//         .then(success(res))
//         .catch(next);

// export const destroy = ({ params }, res, next) =>
//     User.findById(params.id)
//         .then(notFound(res))
//         .then((user) => (user ? user.remove() : null))
//         .then(success(res, 204))
//         .catch(next);

export const resolvers = {
  Query: {
    showMe
  },
  Mutation: {
    createUser: create
  }
}
