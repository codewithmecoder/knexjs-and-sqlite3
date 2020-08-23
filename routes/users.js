const express = require('express')
const Lesson = require('../models/dbHelper')
const route = express.Router()

route.get('/', (req, res) => {
  Lesson.findAllUsers()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    res.status(500).json({ message: "Can not retreive User"})
  })
})

route.get('/:username', (req, res) => {
  const { username } = req.params
  Lesson.findUsersByUsername(username)
  .then(user => {
    if(user){
      res.status(200).json(user)
      
    }else{
      res.status(404).json({ message: `User name '${username}' not found`})
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
})


module.exports = route