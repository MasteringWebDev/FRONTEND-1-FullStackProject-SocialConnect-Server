import jwt from 'jsonwebtoken'

export const isLoggedIn = (req, res, next) => {
  try {
    const { token } = req.headers
    if(!token) {
      return res.status(401).json({
        status: 'FAILED',
        message: 'Access denied. Please login to access!'
      })
    }

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      status: 'FAILED',
      message: 'Access denied. Please login to access!'
    })
  }
}