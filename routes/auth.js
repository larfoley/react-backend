const router = require('express').Router()
const passport = require('passport')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const registerUser = require('../controllers/registerUser')

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.json(req.user)
})

router.post('/register', registerUser)

module.exports = router
