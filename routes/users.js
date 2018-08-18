const router = require('express').Router()
const usersController = require('../controllers/users')

router.get('/', usersController)

module.exports = router
