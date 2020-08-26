const express = require('express')
const Lesson = require('../models/dbHelper')
const bcrypt = require('bcryptjs')
const route = express.Router()

route.get('/login', (req, res) => {
  res.render('login')
})
route.get('/register', (req, res) => {
  res.render('register')
})


route.post('/register', (req, res) => {
  const credentail = req.body
  const { username, email, password } = credentail
  let errors = []
  if(!(username && email && password )){
    // res.status(400).json({ message: "Username Email and password are require"})
    errors.push({ msg: 'Username Email and password are require' })
  }
  if(password.length < 8){
    // return res.status(400).json({ message: "password must be at least 8 characters"})
    errors.push({ msg: 'password must be at least 8 characters' })
  }
  if(errors.length > 0){
    res.render('register',{
      errors,
      username,
      email,
      password
    })
  }else{
    Lesson.findUsersByUsername(username)
    Lesson.findOne(email)
    .then(user => {
      if(user){
        errors.push({ msg: 'Username or Email is already taken' })
        res.render('register',{
          errors,
          username,
          email,
          password
        })
      }else{
        // hash password
        const hash = bcrypt.hashSync(credentail.password, 12)
        credentail.password = hash


        Lesson.addUsers(credentail)
        req.flash(
          'success_msg',
          'You are now registered and can log in'
        )
        res.redirect('/api/auth/login')
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
})


route.post('/login', (req, res) => {
  const { username, password } = req.body
  if(!(username && password)){
    // return res.status(400).json({ message: "Username and password are require" })
    req.flash('error_msg','Username and password are require')
    res.redirect('/api/auth/login')
  }
  
  Lesson.findUsersByUsername(username)
  .then(user =>{
    if(user && bcrypt.compareSync(password, user.password)){

      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email
      }

      res.redirect('/dashboard')
      
    }else{
      req.flash('error_msg','Invalid Password or Username')
      res.redirect('/api/auth/login')
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

route.get('/logout', (req, res) => {
  if(req.session){
    req.session.destroy(error => {
      if(error){
        res.status(500).json({ message: "You can check out anytime you like, but you can never leave"})
      }else{
        res.redirect('/api/auth/login')
      }
    })
  }else{
    res.status(200).json({ message: "Not Logged in"})
  }
})

module.exports = route