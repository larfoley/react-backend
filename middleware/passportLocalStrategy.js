const Strategy = require('passport-local').Strategy

module.exports = new Strategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
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
    })
    return done(null, user)
  }
)
