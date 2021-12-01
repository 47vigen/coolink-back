import { notFound, throwError } from '../../../services/response'
import { IGServiceEnable, IGThrowError } from '../../../services/instagram'
import { saveMany as saveFeedsMany, showPageWithFeedsSectionsByPage } from '../feed/resolvers'
import simplifyIGMedias from '../../../utils/simplifyIGMedias'

const showInfoByUsername = (_, { username }, ctx) =>
  IGServiceEnable()
    .then((IG) =>
      IG.user
        .getIdByUsername(username)
        .then(notFound('user not found'))
        .then((pk) => IG.user.info(pk))
        .then(notFound('can not get user info'))
        .then(({ pk, hd_profile_pic_url_info: { url: profilePic }, full_name: fullName, is_private: isPrivate }) => ({
          pk,
          fullName,
          profilePic,
          isPrivate
        }))
    )
    .catch(IGThrowError())

const showFeedsByPage = (_, { page, next }, ctx) =>
  showPageWithFeedsSectionsByPage(_, { page }, ctx)
    .then(({ page }) =>
      IGServiceEnable()
        .then((IG) => {
          const followersFeed = IG.feed.user(page.pk)
          if (next) followersFeed.deserialize(JSON.stringify({ nextMaxId: next }))
          return followersFeed.request().then(async ({ items, next_max_id: nextPage }) => {
            const feeds = simplifyIGMedias(items, page.pk)
            if (feeds?.length) saveFeedsMany(feeds)
            return { feeds, next: nextPage }
          })
        })
        .catch(throwError())
    )
    .catch(IGThrowError())

export const updateOldFeeds = (feeds = []) =>
  IGServiceEnable()
    .then((IG) =>
      Promise.all(
        feeds.map((feed) => {
          if (Math.abs(new Date() - new Date(+feed.updatedAt)) / (1000 * 60 * 60 * 24) >= 7) {
            return IG.media
              .info(feed.pk)
              .then((resault) => {
                if (!resault.items?.length) return feed
                const feeds = simplifyIGMedias(resault.items, feed.pagePk)
                if (feeds?.length) {
                  return saveFeedsMany(feeds)
                    .then((feeds) => feeds[0])
                    .catch(throwError(null, feeds[0]))
                } else return feed
              })
              .catch(throwError(null, feed))
          } else return feed
        })
      ).catch(throwError(null, feeds))
    )
    .catch(throwError(null, feeds))

export const sendFollowRequest = async (_, { pk }, ctx) =>
  IGServiceEnable()
    .then((IG) => IG.friendship.create(pk))
    .then(({ outgoing_request: outgoingRequest, following }) => ({ outgoingRequest, following }))
    .catch(IGThrowError())

export const resolvers = {
  Query: {
    showIGFeedsByPage: showFeedsByPage
  },
  Mutation: {
    showIGInfoByUsername: showInfoByUsername
  }
}
