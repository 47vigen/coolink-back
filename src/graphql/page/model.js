import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import deepCleaner from 'deep-cleaner'


const pageSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    pk: {
      type: String,
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
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String
    },
    profilePic: {
      type: String
    },
    customize: {
      color: {
        type: String
      },
      backgroundImage: {
        type: String
      }
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

pageSchema.methods = {
  view(full) {
    deepCleaner(this)

    const view = {
      id: this.id,
      pk: this.pk,
      slug: this.slug,
      title: this.title,
      subTitle: this.subTitle,
      avatar: this.avatar,
      style: this.style
    }
    return full
      ? {
          ...view,
          user: this.user.view(true),
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
        }
      : view
  }
}

pageSchema.plugin(mongooseKeywords, { paths: ['slug', 'title', 'subTitle'] })

const model = mongoose.model('Page', pageSchema)

export const schema = model.schema
export default model
