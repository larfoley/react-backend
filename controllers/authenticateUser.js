const passport = require('passport')

module.exports = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    if (err) { return next(err) }

    if (!user) {
      const error = new Error("invalid login credentials")
      error.status = 401
      return next(error)
    }

    req.logIn(user, err => {
      if (err) { return next(err) }
      res.json({id: user._id})
    })

  })(req, res, next)

}
