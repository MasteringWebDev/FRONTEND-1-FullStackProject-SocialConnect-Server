import express from 'express'
import { getPosts, createPost } from '../controllers/post.js'
import { isLoggedIn } from '../middlewares/auth.js'

const router = express.Router()

router.get('/', isLoggedIn, getPosts)
router.post('/create', isLoggedIn, createPost)

export default router