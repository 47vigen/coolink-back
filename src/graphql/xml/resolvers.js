import { Page } from '../page'
import { Post } from '../blog/post'
import { Section } from '../section'
import { Feed } from '../instagram/feed'
import { isArray } from '../../utils/is'
import { notFound, throwError } from '../../services/response'

const show = (_, args, ctx) =>
  Page.find(null, null, { sort: { updatedAt: -1 } })
    .then((pages) =>
      Promise.all(
        pages.map((page) =>
          Section.findOne({ page: page.id, type: 'feeds' })
            .then((section) => {
              if (!!section) {
                return Feed.find({ pagePk: page.pk }, null, { sort: { createdAt: -1 }, limit: 12 })
                  .then((feeds) =>
                    feeds?.map((feed) => ({ loc: `https://coolink.ir/${page.slug}/feeds/${feed.pk}`, priority: 0.5, updatedAt: feed.updatedAt }))
                  )
                  .then((feeds) =>
                    feeds?.length
                      ? [page, ...feeds, { loc: `https://coolink.ir/${page.slug}/feeds`, priority: 0.5, updatedAt: feeds[0].updatedAt }]
                      : [page]
                  )
                  .catch(throwError(null, page))
              } else return page
            })
            .catch(throwError(null, page))
        )
      ).catch(
        throwError(
          null,
          pages.map((page) => [page])
        )
      )
    )
    .then((pages) => {
      const items = []
      pages.map((page) => (isArray(page) ? items.push(...page) : items.push(page)))
      return items
    })
    .then((pages) =>
      Post.find(null, null, { sort: { updatedAt: -1 } })
        .then((posts) => [...pages, ...posts])
        .catch(() => pages)
    )
    .then(notFound('xml data not found'))
    .then((dynamics) =>
      dynamics?.map((dynamic) => ({
        loc: dynamic.loc || (dynamic.body ? `https://coolink.ir/blog/${dynamic.slug}` : `https://coolink.ir/${dynamic.slug}`),
        priority: dynamic.priority || (dynamic.body ? 0.7 : 1),
        lastmod: new Date(dynamic.updatedAt).toISOString(),
        changefreq: 'daily'
      }))
    )
    .catch(throwError())

export const resolvers = {
  Query: {
    showXml: show
  }
}
