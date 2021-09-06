// import { success, notFound, authorOrAdmin } from '../../services/response/'
import Page from './model'

const create = async (_, { pageInput }, { auth }) => {
  try {
    const user = auth.user
    const data = await Page.create({ ...pageInput, user })
    const page = data.view()
    return page
  } catch (err) {
    throw new Error(err)
  }
}

export const resolvers = {
  Mutation: {
    createPage: create
  }
}

// export const index = ({ querymen: { query, select, cursor } }, res, next) =>
//   Page.count(query)
//     .then((count) =>
//       Page.find(query, select, cursor)
//         .populate('user')
//         .then((pages) => ({
//           count,
//           rows: pages.map((page) => page.view())
//         }))
//     )
//     .then(success(res))
//     .catch(next)

// export const show = ({ params }, res, next) =>
//   Page.findById(params.id)
//     .populate('user')
//     .then(notFound(res))
//     .then((page) => (page ? page.view() : null))
//     .then(success(res))
//     .catch(next)

// export const update = ({ user, bodymen: { body }, params }, res, next) =>
//   Page.findById(params.id)
//     .populate('user')
//     .then(notFound(res))
//     .then(authorOrAdmin(res, user, 'user'))
//     .then((page) => (page ? Object.assign(page, body).save() : null))
//     .then((page) => (page ? page.view(true) : null))
//     .then(success(res))
//     .catch(next)

// export const destroy = ({ user, params }, res, next) =>
//   Page.findById(params.id)
//     .then(notFound(res))
//     .then(authorOrAdmin(res, user, 'user'))
//     .then((page) => (page ? page.remove() : null))
//     .then(success(res, 204))
//     .catch(next)
