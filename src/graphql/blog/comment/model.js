import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    post: {
      type: Schema.ObjectId,
      ref: 'Post',
      required: true
    },
    status: {
      type: Number,
      required: true,
      default: 0
    },
    body: {
      type: String,
      required: true
    },
    replies: [
      {
        type: Schema.ObjectId,
        ref: 'Comment'
      }
    ],
    repliedTo: {
      type: Schema.ObjectId,
      ref: 'Comment',
      default: null
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

commentSchema.methods = {
  view(full) {
    this.populate('replies')
    const view = {
      id: this.id,
      body: this.body,
      user: this.user.view(full),
      replies: this.replies?.filter((reply) => reply?.status === 1)?.map((reply) => reply?.view(full)),
      createdAt: this.createdAt
    }
    return full
      ? {
          ...view,
          status: this.status,
          post: this.post.view(full),
          repliedTo: this.repliedTo?.view(full) || null,
          updatedAt: this.updatedAt
        }
      : view
  }
}

const model = mongoose.model('Comment', commentSchema)

export const schema = model.schema
export default model
