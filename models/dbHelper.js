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
module.exports ={
  add,
  find,
  findById,
  remove,
  addMessage,
  findMessageById,
}