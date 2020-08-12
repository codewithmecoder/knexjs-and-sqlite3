const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

// add, find , findById, remove, update
// lessons table
// add
const add = async lesson => {
  const [id] = await db('lessons').insert(lesson)
  return id
}

const find = () => {
  return db('lessons')
}

const findById = (id) => {
  return db('lessons')
  .where({ id }) // full form { id : id }
  .first()
}

const remove = (id) => {
  return db('lessons')
  .where({ id })
  .del()
}

// messages table
// add
const addMessage = async (message, lesson_id) => {
  const [id] = await db('messages')
  .where({ lesson_id }) // full form { lesson_id : lesson_id}
  .insert(message)
  return findMessageById(id)
}

// findMessageById
const findMessageById = (id) => {
  return db('messages')
  .where({ id }) //full form { id : id }
  .first()
}

// findLessonMessages
const findLessonMessages = (lesson_id) => {
  return db('lessons as l')
    .join('messages as m', 'l.id', 'm.lesson_id')
    .select(
      'l.id as L',
      'l.name as LessonName',
      'm.id as MessageId',
      'm.sender',
      'm.text'
    )
    .where( { lesson_id})
  // .where({ lesson_id })
}

const removeMessage = id => {
  return db('messages')
  .where({ id })
  .del()
}
module.exports ={
  add,
  find,
  findById,
  remove,
  addMessage,
  findMessageById,
  findLessonMessages,
  removeMessage,
}