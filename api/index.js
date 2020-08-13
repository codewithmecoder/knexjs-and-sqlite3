const express = require('express')
const Lesson = require('../models/dbHelper')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({message: "Hello from me"})
})

app.use('/api/lessons', require('../routes/lessons'))
app.use('/api/messages', require('../routes/messages'))
app.use('/api/users', require('../routes/users'))

module.exports = app