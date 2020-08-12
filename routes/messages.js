const express = require('express')
const Lesson = require('../models/dbHelper')
const route = express.Router()

route.delete('/:id', (req, res) => {
  const { id } = req.params
  
  Lesson.removeMessage(id)
  .then(count => {
    if(count > 0){
      res.status(200).json({message: `Message with id ${id} successfully deleted`})
    }else{
      res.status(404).json({message: `No message with this id ${id}`})
    }
  })
  .catch(error => {
    res.status(500).json({message: "Unable to delete"})
  })
})

module.exports = route