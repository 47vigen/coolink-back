import { Page } from '../page'
import { Post } from '../blog/post'
import { notFound, throwError } from '../../services/response'

const show = (_, args, ctx) =>
  Page.find()
    .sort({ createdAt: -1 })
    .then(async (pages) => [...pages, ...(await Post.find().sort({ createdAt: -1 }))])
    .then(notFound())
    .then((dynamics) =>
      dynamics.map((dynamic) => ({
        loc: dynamic.body ? `https://coolink.ir/blog/${dynamic.slug}` : `https://coolink.ir/${dynamic.slug}`,
        priority: dynamic.body ? 0.7 : 1,
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
