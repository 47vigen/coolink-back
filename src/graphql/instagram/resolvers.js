import { getIg } from '../../services/instagram'

const getPageInfo = async (_, { username }, ctx) => {
  try {
    const ig = await getIg()
    if (ig) {
      const takedPk = await ig.user.getIdByUsername(username)

      const {
        pk,
        hd_profile_pic_url_info: { url: profilePic },
        full_name: fullName
      } = await ig.user.info(takedPk)

      return { pk, fullName, profilePic }
    }
  } catch (err) {
    throw new Error(err)
  }
}

const getPageFeeds = async (_, { pk, firstFeed, next }, ctx) => {
  try {
    const ig = await getIg()
    if (ig) {
      const followersFeed = ig.feed.user(pk)

      if (next) followersFeed.deserialize(JSON.stringify({ nextMaxId: next }))

      const { items } = await followersFeed.request()

      const renderedItem = []
      for (const item of items) {
        if (firstFeed === item?.pk) break

        const slides = []

        if (item?.carousel_media_count) {
          for (const media of item?.carousel_media) {
            if (media?.video_duration) {
              slides?.push({
                type: 'video',
                image_url: media?.image_versions2?.candidates[0]?.url,
                video_url: media?.video_versions[0]?.url
              })
            } else {
              slides?.push({
                type: 'image',
                image_url: media?.image_versions2?.candidates[0]?.url
              })
            }
          }
        } else if (item?.video_duration) {
          slides?.push({
            type: 'video',
            image_url: item?.image_versions2?.candidates[0]?.url,
            video_url: item?.video_versions[0]?.url
          })
        } else {
          slides?.push({
            type: 'image',
            image_url: item?.image_versions2?.candidates[0]?.url
          })
        }

        renderedItem.push({
          id: item?.pk,
          page_pk: pk,
          created_at: new Date(item?.taken_at * 1000),
          caption: item?.caption?.text,
          data: { slides }
        })
      }

      // ready for cache
      return 'getted'
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const resolvers = {
  Mutation: {
    getPageInfo,
    getPageFeeds
  }
}
