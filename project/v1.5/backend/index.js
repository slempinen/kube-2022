const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const cors = require('cors')
const { Pool } = require('pg')

const  pool = new Pool({
  user: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})

const getTodos = async () => {
  const { rows } = await pool.query('SELECT * FROM todo')
  return rows || []
}

const insertTodo = async (todo) => {
  await pool.query('INSERT INTO todo (todo) VALUES ($1)', [todo])
}

const initialize = async () => {
  await pool.query('CREATE TABLE IF NOT EXISTS todo (id SERIAL PRIMARY KEY, todo TEXT)')
}

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.post('/todos', async (req, res) => {
  const newTodo = req.body.todo
  console.log(`Received new todo`)
  if (!newTodo || newTodo.length > 140) {
    console.log(`New todo is undefined or exceeds character limit (140)`)
    res.sendStatus(400)
  } else {
    console.log(`Todo content: ${newTodo}`)
    await insertTodo(newTodo)
    res.sendStatus(201)
  }
})

app.get('/todos', async (req, res) => {
  const todos = await getTodos()
  res.json({ todos })
})

app.listen(port, async () => {
  console.log(`Server started in port ${port}`)
  initialize()
})
