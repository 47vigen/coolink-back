import { Section } from '.'
import { validate } from 'uuid'
import { authorOrAdmin, notFound, throwError } from '../../services/response'

const create = (_, { sectionInput }, { auth }) =>
  Section.create({ ...sectionInput, user: auth.user })
    .then((section) => section.view())
    .then(notFound())
    .catch(throwError())

const update = (_, { id, sectionInput }, ctx) =>
  Section.findById(id)
    .populate('user')
    .then(notFound('section not found'))
    .then(authorOrAdmin(ctx, 'user'))
    .then((section) => Object.assign(section, sectionInput).save())
    .then((section) => section.view(true))
    .catch(throwError())

const saveMany = (_, { sections }, ctx) =>
  Promise.all(
    sections.map((section) => {
      if (validate(section.id)) {
        return create(null, section, ctx)
      } else return update(null, section, ctx)
    })
  ).catch(throwError())

const destroy = (_, { id }, ctx) =>
  Section.findById(id)
    .then(notFound('section not found'))
    .then(authorOrAdmin(ctx, 'user'))
    .then((section) => section.remove())
    .catch(throwError())

export const resolvers = {
  Mutation: {
    destroySection: destroy,
    saveManySections: saveMany
  }
}
