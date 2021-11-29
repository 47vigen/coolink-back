import mongoose, { Schema } from 'mongoose'

const statisticSchema = new Schema(
  {
    page: {
      type: Schema.ObjectId,
      ref: 'Page',
      required: true
    },
    ids: [
      {
        type: Schema.ObjectId
      }
    ],
    event: {
      type: String,
      required: true
    },
    agent: {
      type: String
    },
    referrer: {
      type: String
    },
    pathname: {
      type: String
    },
    ip: {
      type: String
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

statisticSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      ip: this.ip,
      ids: this.ids,
      event: this.event,
      agent: this.agent,
      referrer: this.referrer,
      pathname: this.pathname,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
    return full
      ? {
          ...view,
          page: this.page.view(true)
        }
      : view
  }
}

const model = mongoose.model('Statistic', statisticSchema)

export const schema = model.schema
export default model
