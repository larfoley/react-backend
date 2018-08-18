const User = require('../models/User')

module.exports = (req, res, next) => {
  User.find({}, (err, docs) => {
    if (err) return next(err)
    res.json(docs)
  })
}
