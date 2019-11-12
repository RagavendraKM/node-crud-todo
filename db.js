const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todo_name: String,
    todo_description: String,
    todo_responsible: String,
    todo_priority: String,
    todo_completed : Boolean
})

var Todo = mongoose.model('todo', todoSchema, 'todo')
module.exports = Todo