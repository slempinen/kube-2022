const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const cors = require('cors')

let todos = []

app.use(bodyParser.json())
app.use(cors())

app.post('/todos', (req, res) => {
  const newTodo = req.body.todo
  if (!newTodo) {
    res.sendStatus(400)
  } else {
    todos = todos.concat(newTodo)
    res.sendStatus(201)
  }
})

app.get('/todos', (req, res) => {
  res.json({ todos })
})

app.listen(port, async () => {
  console.log(`Server started in port ${port}`)
})
