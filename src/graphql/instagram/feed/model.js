import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const feedSchema = new Schema(
  {
    pk: {
      type: String,
      unique: true,
      required: true
    },
    pagePk: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    caption: {
      type: String
    },
    slides: [
      {
        type: {
          type: String,
          required: true,
          enum: ['image', 'video']
        },
        imageUrl: {
          type: String,
          required: true
        },
        videoUrl: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
      }
    }
  }
)

feedSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      pk: this.pk,
      title: this.title,
      slides: this.slides,
      caption: this.caption,
      createdAt: this.createdAt
    }
    return full
      ? {
          ...view,
          updatedAt: this.updatedAt
        }
      : view
  }
}

feedSchema.plugin(mongooseKeywords, { paths: ['caption'] })

const model = mongoose.model('Feed', feedSchema)

export const schema = model.schema
export default model
