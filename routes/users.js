const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', userController.get_users)

module.exports = router
