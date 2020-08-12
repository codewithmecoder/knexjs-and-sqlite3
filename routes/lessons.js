const express = require('express')
const Lesson = require('../models/dbHelper')
const route = express.Router()

route.get('/', (req, res) => {
  Lesson.find()
  .then(lessons => {
    res.status(200).json(lessons)
  })
  .catch(error => {
    res.status(500).json({message: 'Lessons not found'})
  })
  
})

route.post('/', (req, res) => {
  Lesson.add(req.body)
  .then(lesson => {
    res.status(200).json(lesson)
  })
  .catch(error => {
    res.status(500).json({message: "Can not add lessons."})
  })
})

route.get('/:id', (req, res) => {
  const { id } = req.params

  Lesson.findById(id)
  .then(lesson => {
    if(lesson){
      res.status(200).json(lesson)
    }else{
      res.status(404).json({message: 'lesson not found'})
    }
  })
  .catch(error => {
    res.status(500).json({message: "Unable to perform operation"})
  })
})

route.delete('/:id', (req, res) => {
  const { id } = req.params
  
  Lesson.remove(id)
  .then(count => {
    if(count > 0){
      res.status(200).json({message: "Successfully deleted lesson"})
    }else{
      res.status(404).json({message: "Can not find lesson to delete"})
    }
  })
  .catch(error => {
    res.status(500).json({message: "Unable to delete"})
  })
})

route.post('/:id/messages', (req, res) => {
  const { id } = req.params
  const msg = req.body

  if(!msg.lesson_id){
    msg['lesson_id'] = parseInt(id, 10)
  }

  Lesson.findById(id)
  .then(lesson => {
    if(!lesson){
      res.status(404).json({ message: 'Invalid Id'})
    }

    if(!msg.sender || !msg.text){
      res.status(400).json({ message: "Must Provide both Sender and Text"})
    }

    Lesson.addMessage(msg, id)
    .then(message => {
      if(message) {
        res.status(200).json(message)
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Fail to add message"})
    })
  })
  .catch(error => {
    res.status(500).json({ message: 'Error findding message'})
  })
})

route.get('/:id/messages', (req, res) => {
  const { id } = req.params

  Lesson.findLessonMessages(id)
  .then(lessons => {
    res.status(200).json(lessons)
  })
  .catch(error => {
    res.status(500).json({ message: "Error retreiving message"})
  })
})

module.exports = route