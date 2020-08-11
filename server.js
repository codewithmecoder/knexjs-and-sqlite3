const express = require('express')
const Lesson = require('./models/dbHelper')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({message: "Hello from me"})
})

app.get('/api/lessons', (req, res) => {
  Lesson.find()
  .then(lessons => {
    res.status(200).json(lessons)
  })
  .catch(error => {
    res.status(500).json({message: 'Lessons not found'})
  })
  
})

app.post('/api/lessons', (req, res) => {
  Lesson.add(req.body)
  .then(lesson => {
    res.status(200).json(lesson)
  })
  .catch(error => {
    res.status(500).json({message: "Can not add massages."})
  })
})

app.get('/api/lessons/:id', (req, res) => {
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

app.delete('/api/lessons/:id', (req, res) => {
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

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))