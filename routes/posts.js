const router = require('express').Router()
const postsController = require('../controllers/postsController')

router.get('/', postsController.get_posts)

module.exports = router
