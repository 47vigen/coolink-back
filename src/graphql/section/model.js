import mongoose, { Schema } from 'mongoose'
import { customize } from '../../utils/customize'

const types = ['links', 'text', 'contacts', 'services', 'locations', 'faq', 'igFeedsLink', 'igFeedsDownload']

const sectionSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    page: {
      type: Schema.ObjectId,
      ref: 'Page',
      required: true
    },
    type: {
      type: String,
      enum: types,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    title: {
      type: String
    },
    items: [
      {
        type: {
          type: String
        },
        key: {
          type: String
        },
        value: {
          type: String
        },
        options: [
          {
            key: {
              type: String
            },
            value: {
              type: String
            }
          }
        ]
      }
    ],
    arrangement: {
      type: String
    },
    customized: {
      type: Boolean,
      default: false
    },
    customize: [customize]
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

sectionSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      type: this.type,
      title: this.title,
      position: this.position,
      customized: this.customized,
      customize: this.customize,
      items: this.items
    }
    return full
      ? {
          ...view,
          user: this.user.view(true),
          page: this.page.view(true),
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
        }
      : view
  }
}

sectionSchema.statics = {
  types
}

const model = mongoose.model('Section', sectionSchema)

export const schema = model.schema
export default model
