const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = (req, res, next) => {

  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    // TODO: Validate input
    const error = new Error('Username of password format is invalid')
    error.status = 400
    return next(error)
  }

  User.findOne({email}).exec((err, user) => {
    if (err) { return next(err) }

    if (user) {
      err = new Error('user already exists')
      err.status = 400
      return next(err)
    }

    bcrypt.hash(password, 10, (err, passwordHash) => {
      if (err) return next(err)

      const user = new User({ email, passwordHash })
      user.save(err => {
        if (err) { return next(err) }

        res.status(200).json({message: "user registered", user: user})
      })
    })
  })


}
