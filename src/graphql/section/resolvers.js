import { notFound, throwError } from '../../services/response'
import Section from './model'

const create = (_, { sectionInput }, { auth }) =>
  Section.create({ ...sectionInput, user: auth.user })
    .then((section) => section.view())
    .then(notFound())
    .catch(throwError())

const show = (_, { page }, ctx) =>
  Section.find({ page }, null, { sort: { position: 1 } })
    .then((sections) => sections.map((section) => section.view()))
    .catch(throwError())

export const resolvers = {
  Query: {
    showSection: show
  },

  Mutation: {
    createSection: create
  }
}
