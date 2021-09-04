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

export const resolvers = {
  Mutation: {
    getPageInfo
  }
}
