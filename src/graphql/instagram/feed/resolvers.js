import { Feed } from '.'
import { Page } from '../../page'
import { Section } from '../../section'
import term from '../../../utils/term'
import { authorOrAdmin, notFound, throwError } from '../../../services/response'
import { updateOldFeeds } from '../main/resolvers'

export const saveMany = (feeds = []) =>
  Promise.all(
    feeds?.map(({ pk, ...feedInput }) =>
      Feed.findOne({ pk })
        .then((feed) => (feed ? Object.assign(feed, feedInput).save() : Feed.create({ pk, ...feedInput })))
        .then((feed) => (feed ? feed.view() : null))
        .catch(throwError(null, { pk, ...feedInput }))
    )
  ).catch(throwError(null, feeds))

const search = (_, { pagePk, q }, ctx) =>
  Feed.find({ pagePk, $text: { $search: term(q) } }, null, { limit: 24 })
    .then((feeds) => feeds?.map((feed) => feed.view()))
    .then((feeds) => updateOldFeeds(feeds))
    .catch(throwError())

const destroy = (_, { id }, ctx) =>
  Feed.findById(id)
    .then(notFound('feed not found'))
    .then(authorOrAdmin(ctx, 'user'))
    .then((feed) => feed.remove())
    .catch(throwError())

const showOneWithPageSection = (_, { slug, pk }, ctx) =>
  Feed.findOne({ pk })
    .then(notFound('feed not found'))
    .then((feed) => updateOldFeeds([feed]))
    .then((feeds) =>
      showPageWithFeedsSectionBySlug(_, { slug, noFeeds: true }, ctx)
        .then((details) => ({ ...details, feed: feeds[0] }))
        .catch(throwError())
    )
    .catch(throwError())

const showPageWithFeedsSectionBySlug = (_, { slug, noFeeds = false }, ctx) =>
  Page.findOne({ slug })
    .then(notFound('page not found'))
    .then((page) =>
      Section.findOne({ page, type: 'feeds' })
        .then(notFound('page does not have feeds section'))
        .then((section) => {
          if (noFeeds) {
            return { page: page.view(), section: section.view() }
          } else {
            return Feed.find({ pagePk: page.pk }, null, { sort: { createdAt: -1 }, limit: 12 })
              .then((feeds) => feeds?.map((feed) => feed.view()))
              .then((feeds) => ({ page: page.view(), section: section.view(), feeds }))
              .catch(throwError())
          }
        })
        .catch(throwError())
    )
    .catch(throwError())

export const showPageWithFeedsSectionsByPage = (_, { page }, ctx) =>
  Section.findOne({ page, type: 'feeds' })
    .then(notFound('feeds section not found'))
    .then((section) =>
      Page.findById(page)
        .then(notFound('page not found'))
        .then((page) => ({ page: page.view(), section: section.view() }))
        .catch(throwError())
    )
    .catch(throwError())

export const resolvers = {
  Query: {
    searchFeeds: search,
    showPageWithFeedsSectionBySlug,
    showOneFeedWithPageSection: showOneWithPageSection
  },
  Mutation: {
    destroyFeed: destroy
  }
}
