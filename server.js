require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportStrategy = require('./controllers/passportStrategy')
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require('connect-mongo')(session)
const User = require('./models/User.js')
const app = express()
const helmet = require('helmet')
const db = mongoose.connection

// Require Routes
// ==============
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const registerRouter = require('./routes/register')
const usersRouter = require('./routes/users')

// initialize database
//========================
mongoose.connect( process.env.DB_URL, { useNewUrlParser: true })

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log("Connected to database")
})

// Configure Passport.js
//==========================
passport.use(passportStrategy)

// serialized to the session, and deserialized when subsequent requests are made.
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user))
})

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: db }),
    resave: true,
    saveUninitialized: true,
    cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionOptions.cookie.secure = true // serve secure cookies
}

// Install Middleware
//======================
app.use(helmet())
app.use(session(sessionOptions))
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(passport.initialize())
app.use(passport.session())

// Initialize Routes
//==================
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/register', registerRouter)
app.use('/api/users', usersRouter)

// catch 404 and forward to error handler
// ======================================
app.use('/api/*', (req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Send React App
// ==============
app.use('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

// error handler
// =============
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log("Error: ", err.message)
  res.status(err.status || 500).json(err.message)
})

module.exports = app
