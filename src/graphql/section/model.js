import mongoose, { Schema } from 'mongoose'

const types = ['links', 'text', 'contacts', 'messengers', 'locations', 'faq', 'igFeedsLink', 'igFeedsDownload']

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
    links: [
      {
        url: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true
        }
      }
    ],
    text: {
      type: String
    },
    contacts: {
      mobile: {
        type: String,
        match: /^(09)\d{9}$/
      },
      phone: {
        type: String,
        match: /^(0)\d{10}$/
      },
      email: {
        type: String,
        match: /^\S+@\S+\.\S+$/
      },
      fax: {
        type: String
      }
    },
    messengers: {
      telegram: {
        type: String,
        match: /^(?!\d)(?:(?![@#])[\w])+$/
      },
      whatsapp: {
        type: String,
        match: /^(09)\d{9}$/
      },
      twitter: {
        type: String,
        match: /^@?(\w){1,15}$/
      },
      youtube: {
        type: String,
        match: /(https?:\/\/)?(www\.)?youtube\.com\/(channel|user)\/[\w-]+/
      },
      linkedin: {
        type: String,
        match: /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/
      }
    },
    locations: [
      {
        url: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true
        }
      }
    ],
    faq: [
      {
        question: {
          type: String,
          required: true
        },
        answer: {
          type: String,
          required: true
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

sectionSchema.pre('save', function (next) {
  const typeIndex = types.findIndex((type) => type === this.type)
  minimalTypes.map((type, idx) => {
    if (typeIndex === idx) return false
    this[type] = null
    return true
  })
  next()
})

sectionSchema.methods = {
  view(full) {
    const typeIndex = types.findIndex((type) => type === this.type)
    const view = {
      id: this.id,
      type: this.type,
      title: this.title,
      position: this.position,
      [minimalTypes[typeIndex]]: this[minimalTypes[typeIndex]]
    }

    return full
      ? {
          ...view,
          user: this.user.view(true),
          page: this.page.view(true)
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
