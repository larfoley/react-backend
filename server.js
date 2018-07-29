require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportStrategy = require('./middleware/passportLocalStrategy')
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require('connect-mongo')(session)
const User = require('./models/User.js')
const app = express()
const userRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const authRouter = require('./routes/auth')
const helmet = require('helmet')

mongoose.connect( process.env.DB_URL, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log("Connected to database")
})

passport.use(passportStrategy)

// serialized to the session, and deserialized when subsequent requests are made.
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user))
})

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true,
    cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionOptions.cookie.secure = true // serve secure cookies
}

app.use(helmet())
app.use(session(sessionOptions))
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/posts', postsRouter)

// catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Send React App
app.use('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log("Error: ", err.message)
  res.status(err.status || 500).send(err.message)
})

module.exports = app
