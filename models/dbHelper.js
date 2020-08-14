const db = require('../dbConfig')

// add, find , findById, remove, update
// lessons table
// add
const add = async lesson => {
  return await db('lessons')
    .insert(lesson, ['id', 'name'])
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
  return await db('messages')
    .where({ lesson_id })
    .insert(message, ['id'])
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


// users table
// add user

const addUsers = async (user) => {
  return db('users')
    .insert(user, ['id', 'username'])
}
// findAllUsers
const findAllUsers = () => {
  return db('users')
}
// findUsersByUsername
const findUsersByUsername = (username) => {
  return db('users')
    .where({ username })
    .first()
}

// findOne
const findOne = (email) => {
  return db('users')
    .where({ email })
    .first()
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
  addUsers,
  findAllUsers,
  findUsersByUsername,
  findOne,
}