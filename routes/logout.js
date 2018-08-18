const router = require('express').Router()

router.get('/', (req, res) => {
  req.logout()
  // res.redirect('/')
  res.json({message: "logged out"})
})

module.exports = router
