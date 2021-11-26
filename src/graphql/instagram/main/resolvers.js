import { throwError } from '../../../services/response'
import { IGServiceEnable, IGThrowError } from '../../../services/instagram'
import { saveMany as saveFeedsMany, showPageWithFeedsSectionsByPage } from '../feed/resolvers'

const showInfo = (_, { username }, ctx) =>
  IGServiceEnable()
    .then((IG) =>
      IG.user
        .getIdByUsername(username)
        .then((pk) => IG.user.info(pk))
        .then(({ pk, hd_profile_pic_url_info: { url: profilePic }, full_name: fullName, is_private: isPrivate }) => ({
          pk,
          fullName,
          profilePic,
          isPrivate
        }))
    )
    .catch(IGThrowError())

const showFeeds = (_, { page, next }, ctx) =>
  IGServiceEnable()
    .then((IG) =>
      showPageWithFeedsSectionsByPage(_, { page }, ctx)
        .then(({ page }) => {
          const followersFeed = IG.feed.user(page.pk)
          if (next) followersFeed.deserialize(JSON.stringify({ nextMaxId: next }))
          return followersFeed.request().then(({ items, next_max_id: nextPage }) => {
            const feeds = items
              .map((item) => {
                const slides = []

                if (item?.id) {
                  if (item.carousel_media_count) {
                    // eslint-disable-next-line array-callback-return
                    item.carousel_media.map((media) => {
                      if (media?.video_duration) {
                        slides?.push({
                          type: 'video',
                          imageUrl: media?.image_versions2?.candidates[0]?.url,
                          videoUrl: media?.video_versions[0]?.url
                        })
                      } else {
                        slides?.push({
                          type: 'image',
                          imageUrl: media?.image_versions2?.candidates[0]?.url
                        })
                      }
                    })
                  } else if (item.video_duration) {
                    slides?.push({
                      type: 'video',
                      imageUrl: item.image_versions2?.candidates[0]?.url,
                      videoUrl: item.video_versions[0]?.url
                    })
                  } else {
                    slides?.push({
                      type: 'image',
                      imageUrl: item.image_versions2?.candidates[0]?.url
                    })
                  }

                  return {
                    slides,
                    pk: item.id,
                    pagePk: page.pk,
                    caption: item.caption?.text,
                    createdAt: new Date(item.taken_at * 1000)
                  }
                }
                return null
              })
              .filter((item) => item)

            saveFeedsMany(feeds)
            return { feeds, next: nextPage }
          })
        })
        .catch(throwError())
    )
    .catch(IGThrowError())

export const sendFollowRequest = async (_, { pk }, ctx) =>
  IGServiceEnable()
    .then((IG) => IG.friendship.create(pk))
    .then(({ outgoing_request: outgoingRequest, following }) => ({ outgoingRequest, following }))
    .catch(IGThrowError())

export const resolvers = {
  Query: {
    showIGFeeds: showFeeds
  },
  Mutation: {
    showIGInfo: showInfo
  }
}
