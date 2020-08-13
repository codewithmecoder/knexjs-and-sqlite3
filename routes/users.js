const express = require('express')
const Lesson = require('../models/dbHelper')
const bcrypt = require('bcryptjs')
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

route.post('/register', (req, res) => {
  const credentail = req.body
  const { username, email, password } = credentail

  if(!(username && email && password)){
    res.status(400).json({ message: "Username Email and password are require"})
  }

  // hash password
  const hash = bcrypt.hashSync(credentail.password, 12)
  credentail.password = hash


  Lesson.addUsers(credentail)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    if(error.errno == 19){
      res.status(400).json({ message: "Username already taken"})
    }else{
      res.status(500).json(error)
    }
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

route.post('/login', (req, res) => {
  const { username, password } = req.body
  if(!(username && password)){
    return res.status(400).json({ message: "Username and password are require" })
  }
  Lesson.findUsersByUsername(username)
  .then(user =>{
    if(user && bcrypt.compareSync(password, user.password)){
      res.status(200).json({ message: `Welcome ${user.username}`})
    }else{
      res.status(404).json({ message: "Invalid username or password"})
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
})
module.exports = route