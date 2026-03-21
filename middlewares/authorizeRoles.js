const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).send({ error: 'forbidden' })
    }

    return next()
  }
}

module.exports = authorizeRoles
