const request = require('request')

exports.get_posts = (req, res, next) => {
  request(
    `https://jsonplaceholder.typicode.com/posts/`,
    (err, response, body) => {
      if (err) return next(err)
      res.json(JSON.parse(body))
    }
  )
}
