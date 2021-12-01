export default function simplifyIGMedias(items = [], pagePk = '') {
  return (
    items
      ?.map((item) => {
        if (!item?.id) return null

        const slides = []
        const caption = item.caption?.text
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
          pagePk,
          caption,
          pk: item.pk,
          createdAt: new Date(item.taken_at * 1000),
          title: (caption?.split(/\n/)?.filter((text) => text && text.replace(/[!@#$%^&*(),.?":{}|_<>-]/gm, '')?.length >= 4) || [])[0]
        }
      })
      ?.filter((item) => item) || []
  )
}
