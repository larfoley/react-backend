const Strategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = new Strategy(
  {usernameField:"email", passwordField:"password"},
  (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      user.verifyPassword(password, (err, validPassword) => {
        if (err) { return done(err) }
        if (!validPassword) {
          return done(null, false, { message: 'Incorrect password.' })
        }
      })
      return done(null, user)
    })
  }
)
