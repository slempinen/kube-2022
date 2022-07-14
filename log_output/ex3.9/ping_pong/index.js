const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const { Pool } = require('pg')

const  pool = new Pool({
  user: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})

const getPings = async () => {
  const { rows } = await pool.query('SELECT * FROM pings WHERE id = 1')
  return rows[0].pings 
}

const initialize = async () => {
  await pool.query('CREATE TABLE IF NOT EXISTS pings (id SERIAL PRIMARY KEY, pings INTEGER)')
  await pool.query('INSERT INTO pings (id, pings) VALUES (1, 0) ON CONFLICT DO NOTHING')
}

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.get('/pingpong', async (req, res) => {
  const pings = await getPings()
  await pool.query('UPDATE pings SET pings = pings + 1 WHERE id = 1')
  res.send(`pong ${pings}`)
})

app.get('/pings', async (req, res) => {
  const pings = await getPings()
  res.json({ pings })
})

app.listen(port, async () => {
  console.log(`Server started in port ${port}`)
  initialize()
})


