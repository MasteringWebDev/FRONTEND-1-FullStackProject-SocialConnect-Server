import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', PostSchema)
export default Post