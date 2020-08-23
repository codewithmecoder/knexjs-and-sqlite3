const express = require('express')
const session = require('express-session')
require('dotenv').config()
const restricted = require('../auth/restricted')
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const app = express()

const sessionConfig = {
  name: 'demon', //name of the cookie
  secret: process.env.SECRET, //secre that makes the cookie effctive
  cookie: {
    maxAge: 1000 * 60 * 60, // time span of the cookie
    secure: false, //for production set to true for https only access
    httpOnly: true, // true means no access from js
  },
  resave: false,
  saveUninitialized: true, // for production set it to false acording to GDPR laws users have to give consent
}
// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.static('public'))

// bodyParser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session(sessionConfig))

// connect flash
app.use(flash())

// global vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

app.get('/', (req, res) => {
  res.render('mainpage')
})
// Dashboard page
app.get('/dashboard', restricted,(req, res) => {
  res.render('dashboard',{
    username : req.session.user.username
  })
})

app.use('/api/auth', require('../auth/authen'))
app.use('/api/lessons', restricted, require('../routes/lessons'))
app.use('/api/messages', restricted, require('../routes/messages'))
app.use('/api/users', restricted, require('../routes/users'))

module.exports = app