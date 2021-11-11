import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const postSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    slug: {
      type: String,
      slug: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    cover: {
      type: String,
      required: true
    },
    title: {
      type: String,
      index: true,
      required: true
    },
    subTitle: {
      type: String
    },
    attachment: {
      type: String
    },
    body: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      required: true,
      default: 0
    }
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

postSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      slug: this.slug,
      title: this.title,
      subTitle: this.subTitle,
      body: this.body,
      cover: this.cover,
      attachment: this.attachment,
      createdAt: this.createdAt,
      views: this.views,
      user: this.user.view(full)
    }
    return full
      ? {
          ...view,
          updatedAt: this.updatedAt
        }
      : view
  }
}

postSchema.plugin(mongooseKeywords, { paths: ['slug', 'title', 'subTitle'] })

const model = mongoose.model('Post', postSchema)

export const schema = model.schema
export default model
