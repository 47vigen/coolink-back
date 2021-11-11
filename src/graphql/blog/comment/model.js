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
    const view = {
      body: this.body,
      user: this.user.view(full),
      replies: this.replies.map((reply) => reply.view(full)),
      repliedTo: this.repliedTo.view(full),
      createdAt: this.createdAt
    }
    return full
      ? {
          ...view,
          status: this.status,
          post: this.post.view(full),
          updatedAt: this.updatedAt
        }
      : view
  }
}

const model = mongoose.model('Comment', commentSchema)

export const schema = model.schema
export default model
