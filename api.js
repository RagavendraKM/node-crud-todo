const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Todo = require('./db')

router.get('/:id', (req, res) => {
  Todo.findById(req.params.id, (err,todos) => {
    if(err) {
      console.log(err)
      }
    res.json(todos)
  })
})

router.post('/add', (req,res) => {
  console.log("FROM POST ADD")
  let todoBody = req.body
  console.log(todoBody);
  newTodos = new Todo(todoBody)
  newTodos.save()
  .then(result => {console.log(result)
  res.status(200).send("Inserted successfully");})
  .catch(err => console.log(err))
})

router.post('/update/:id', (req,res) => {
  Todo.findById(req.params.id , (err,todo) => {
    if(!todo) {
      console.log(err, " Not found")
      res.json(err)
    }
    else {
      todo.todo_name = req.body.todo_name;
      todo.todo_description = req.body.todo_description;
      todo.todo_responsible = req.body.todo_responsible;
      todo.todo_priority = req.body.todo_priority;
      todo.todo_completed = req.body.todo_completed;

      todo.save()
      .then(result => res.status(200).send("Updated Succesfully"))
      .catch(err => res.status(400).send("Update Failed"))
    }
  })
})

router.post('/delete/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id , (err,delId) => {
      if(err) {
        console.log(err)
        res.json(err)
      } else {
        console.log(req.params.id , "Deleted")
        res.json(delId);
      }
    })
});

router.get('/', (req, res) => {
  Todo.find((err,todos) => {
    if(err) {
      console.log(err)
      res.json(err)
      } else 
    res.json(todos)
    //return todos
  })
})

module.exports = router