import path from 'path'
import { existsSync, mkdirSync } from 'fs'

import sharp from 'sharp'
import appRoot from 'app-root-path'
import { customAlphabet } from 'nanoid'
import { GraphQLUpload } from 'graphql-upload'

const streamToString = (stream) => {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

const uploadImage = async (_, { type, pk, image }) => {
  try {
    const uploadsDir = path.join(appRoot.toString(), 'uploads', pk)
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true })
    }
    const { filename, createReadStream } = await image
    const mime = filename.split('.').reverse()[0]
    const newFileName = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16)()
    const uploadPath = `/uploads/${pk}/${newFileName}-${type}.${mime}`
    const streamedImage = await streamToString(createReadStream())
    switch (type) {
      case 'profile':
        await sharp(streamedImage).resize(250, 250).jpeg({ quality: 80 }).toFile(`${appRoot}${uploadPath}`)
        break
      default:
        await sharp(streamedImage).jpeg({ quality: 60 }).toFile(`${appRoot}${uploadPath}`)
        break
    }
    const publicUrl = uploadPath.replace('uploads', 'public')
    return publicUrl
  } catch (error) {
    throw new Error(error)
  }
}

export const resolvers = {
  Upload: GraphQLUpload,

  Mutation: {
    uploadImage: uploadImage
  }
}
