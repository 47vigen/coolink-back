import { validate } from 'uuid'

import { authorOrAdmin, notFound, throwError } from '../../services/response'
import Section from './model'

const create = (_, { sectionInput }, { auth }) =>
  Section.create({ ...sectionInput, user: auth.user.id })
    .then((section) => section.view())
    .then(notFound())
    .catch(throwError())

const show = (_, { page }, ctx) =>
  Section.find({ page }, null, { sort: { position: 1 } })
    .then((sections) => sections.map((section) => section.view()))
    .catch(throwError())

const update = (_, { id, sectionInput }, ctx) =>
  Section.findById(id)
    .populate('user')
    .then(notFound())
    .then(authorOrAdmin(ctx, 'user'))
    .then((section) => (section ? Object.assign(section, sectionInput).save() : null))
    .then((section) => (section ? section.view(true) : null))
    .catch(throwError())

const updateInsertMany = (_, { sections }, ctx) =>
  Promise.all(
    sections.map((section) => {
      if (validate(section.id)) {
        return create(null, section, ctx)
      } else return update(null, section, ctx)
    })
  )
    .then(notFound())
    .catch(throwError())

const destroy = (_, { id }, ctx) =>
  Section.findById(id)
    .then(notFound())
    .then(authorOrAdmin(ctx, 'user'))
    .then((section) => (section ? section.remove() : null))
    .catch(throwError())

export const resolvers = {
  Query: {
    showSection: show
  },

  Mutation: {
    createSection: create,
    updateSection: update,
    updateInsertManySections: updateInsertMany,
    destroySection: destroy
  }
}
