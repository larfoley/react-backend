const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Routes
const user = require('./routes/user')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/user', user)

// catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log("Error: ", err.message);
  res.status(err.status || 500).send(err)

})

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'))
});



module.exports = app
