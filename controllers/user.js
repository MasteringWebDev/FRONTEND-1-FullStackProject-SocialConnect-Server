import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const userSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ username, email, password: encryptedPassword })

    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, { expiresIn: 60*30 })

    res.status(201).json ({
      status: 'SUCCESS',
      message: 'User signed up successfully!',
      token,
      username: user.username
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong!'
    })
  }
}

export const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if(!user) {
      res.status(401).json({
        status: 'FAILED',
        message: 'User with the given email does not exist!'
      })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) {
      res.status(401).json({
        status: 'FAILED',
        message: 'Invalid credentials!'
      })
    }

    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, { expiresIn: 60*30 })

    res.json({
      status: 'SUCCESS',
      message: 'User signed in successfully!',
      token,
      username: user.username
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong!'
    })
  }
}