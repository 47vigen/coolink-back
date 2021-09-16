import { IGServiceEnable, IGThrowError } from '../../services/instagram'

const getPageInfo = (_, { username }, ctx) =>
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

const getPageFeeds = (_, { pk, next }, ctx) =>
  IGServiceEnable()
    .then((IG) => {
      const followersFeed = IG.feed.user(pk)
      if (next) followersFeed.deserialize(JSON.stringify({ nextMaxId: next }))
      return followersFeed.request().then(({ items, next_max_id: nextPage }) => {
        const feeds = items.map((item) => {
          const slides = []

          if (item?.carousel_media_count) {
            // eslint-disable-next-line array-callback-return
            item?.carousel_media.map((media) => {
              if (media?.video_duration) {
                slides?.push({
                  type: 'VIDEO',
                  imageUrl: media?.image_versions2?.candidates[0]?.url,
                  videoUrl: media?.video_versions[0]?.url
                })
              } else {
                slides?.push({
                  type: 'IMAGE',
                  imageUrl: media?.image_versions2?.candidates[0]?.url
                })
              }
            })
          } else if (item?.video_duration) {
            slides?.push({
              type: 'VIDEO',
              imageUrl: item?.image_versions2?.candidates[0]?.url,
              videoUrl: item?.video_versions[0]?.url
            })
          } else {
            slides?.push({
              type: 'IMAGE',
              imageUrl: item?.image_versions2?.candidates[0]?.url
            })
          }

          return {
            id: item?.pk,
            createdAt: new Date(item?.taken_at * 1000),
            caption: item?.caption?.text,
            slides
          }
        })

        return { feeds, next: nextPage }
      })
    })
    .catch(IGThrowError())

const sendFollowRequest = async (_, { pk }, ctx) =>
  IGServiceEnable()
    .then((IG) => IG.friendship.create(pk))
    .then(({ outgoing_request: outgoingRequest, following }) => ({ outgoingRequest, following }))
    .catch(IGThrowError())

export const resolvers = {
  Query: {
    getPageFeeds
  },
  Mutation: {
    getPageInfo,
    sendFollowRequest
  }
}
