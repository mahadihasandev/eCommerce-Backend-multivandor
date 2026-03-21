const jwt = require('jsonwebtoken')

const authJwt = (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).send({ error: 'missing bearer token' })
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'dev_jwt_secret'
    const payload = jwt.verify(token, jwtSecret)

    req.user = {
      id: payload.sub,
      role: payload.role,
      email: payload.email,
    }

    return next()
  } catch (_error) {
    return res.status(401).send({ error: 'invalid or expired token' })
  }
}

module.exports = authJwt
