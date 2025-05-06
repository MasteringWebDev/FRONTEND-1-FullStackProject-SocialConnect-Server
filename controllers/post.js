import Post from '../models/Post.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('user')
    res.json ({
      status: 'SUCCESS',
      data: posts
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong!'
    })
  }
}

export const createPost = async (req, res) => {
  try {
    const { imageURL, caption, tags } = req.body
    const { _id } = req.user

    await Post.create({ imageURL, caption, tags, user: _id })
    res.status(201).json ({
      status: 'SUCCESS',
      message: 'Post created successfully!'
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong!'
    })
  }
}