import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'

const app = express()
app.use(cors({
  origin: 'https://social-connect-client.netlify.app'
}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.get('/', (req, res) => {
  res.json({
    status: 'Server is up!',
    now: new Date().toLocaleString()
  })
})

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Server is running:)'))
    .catch((error) => console.log(error))
})