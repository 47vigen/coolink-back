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
      type: String,
      index: true
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
      pagePk: this.pagePk,
      caption: this.caption,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
    return view
  }
}

feedSchema.index({ caption: 'text' })

feedSchema.plugin(mongooseKeywords, { paths: ['title'] })

const model = mongoose.model('Feed', feedSchema)

export const schema = model.schema
export default model
