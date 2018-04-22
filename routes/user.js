const router = require('express').Router()

router.get('/', (req, res, next) => {
  var user = {
    name: "Bob",
    age: 20
  }

  res.status(200).json(user)
})

module.exports = router
