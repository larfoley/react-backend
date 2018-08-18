const router = require('express').Router()
const authenticateUser = require('../controllers/authenticateUser')

router.post('/', authenticateUser)

module.exports = router
