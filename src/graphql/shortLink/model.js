import mongoose, { Schema } from 'mongoose'

const shortLinkSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    page: {
      type: Schema.ObjectId,
      ref: 'Page'
    },
    slug: {
      type: String,
      slug: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
      required: true,
      unique: true,
      trim: true
    },
    destination: {
      type: String,
      // eslint-disable-next-line no-useless-escape
      slug: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
      required: true,
      trim: true
    },
    isDeep: {
      type: Boolean,
      required: true,
      default: true
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

shortLinkSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      slug: this.slug,
      isDeep: this.isDeep,
      destination: this.destination,
      page: this.page?.view(full)
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

const model = mongoose.model('ShortLink', shortLinkSchema)

export const schema = model.schema
export default model
