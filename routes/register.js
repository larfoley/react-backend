const router = require('express').Router()
const registerUser = require('../controllers/registerUser')

router.post('/', registerUser)

module.exports = router
