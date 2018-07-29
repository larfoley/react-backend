const request = require('request')

exports.get_users = (req, res, next) => {
  request(
    `https://jsonplaceholder.typicode.com/users/`,
    (err, response, body) => {
      if (err) return next(err)
      res.json(JSON.parse(body))
    }
  )
}
