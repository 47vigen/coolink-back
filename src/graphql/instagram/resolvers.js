import { IgLoginRequiredError } from 'instagram-private-api'
import { IG, loginIG } from '../../services/instagram'

const getPageInfo = async (_, { username }, ctx) => {
  try {
    const takedPk = await IG.user.getIdByUsername(username)

    const {
      pk,
      hd_profile_pic_url_info: { url: profilePic },
      full_name: fullName
    } = await IG.user.info(takedPk)

    return { pk, fullName, profilePic }
  } catch (err) {
    if (e instanceof IgLoginRequiredError) {
      await loginIG()
    } else {
      throw new Error(err)
    }
  }
}

const getPageFeeds = async (_, { pk, firstFeed, next }, ctx) => {
  try {
    const followersFeed = IG.feed.user(pk)

    if (next) followersFeed.deserialize(JSON.stringify({ nextMaxId: next }))

    const { items, next_max_id: nextPage } = await followersFeed.request()

    const feeds = []
    for (const item of items) {
      if (firstFeed === item?.pk) break

      const slides = []

      if (item?.carousel_media_count) {
        for (const media of item?.carousel_media) {
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
        }
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

      feeds.push({
        id: item?.pk,
        pk: pk,
        createdAt: new Date(item?.taken_at * 1000),
        caption: item?.caption?.text,
        slides
      })
    }

    return { feeds, next: nextPage }
  } catch (err) {
    if (e instanceof IgLoginRequiredError) {
      await loginIG()
    } else {
      throw new Error(err)
    }
  }
}

export const resolvers = {
  Mutation: {
    getPageInfo,
    getPageFeeds
  }
}
