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
    refer: {
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
      event: this.event,
      ids: this.ids,
      agent: this.agent,
      refer: this.refer,
      createdAt: this.createdAt
    }
    return full
      ? {
          ...view,
          page: this.page.view(true),
          updatedAt: this.updatedAt
        }
      : view
  }
}

const model = mongoose.model('Statistic', statisticSchema)

export const schema = model.schema
export default model
