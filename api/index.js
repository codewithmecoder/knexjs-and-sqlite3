const express = require('express')
const session = require('express-session')
require('dotenv').config()
const restricted = require('../auth/restricted')
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
  saveUnitialized: true, // for production set it to false acording to GDPR laws users have to give consent
}

app.use(express.json())
app.use(session(sessionConfig))


app.get('/', (req, res) => {
  res.json({message: "Hello from me"})
})

app.use('/api/auth', require('../auth/authen'))
app.use('/api/lessons', restricted, require('../routes/lessons'))
app.use('/api/messages', restricted, require('../routes/messages'))
app.use('/api/users', restricted, require('../routes/users'))

module.exports = app