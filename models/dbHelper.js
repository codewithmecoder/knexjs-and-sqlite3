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

module.exports ={
  add,
  find
}