const { Pool } = require('pg')
const axios = require('axios')

const  pool = new Pool({
  user: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})


const url = 'https://en.wikipedia.org/wiki/Special:Random'

const run = async () => {
  const response = await axios.get(url)
  const redirectUrl = response.request.res.responseUrl
  const todo = `Read ${redirectUrl}`
  await pool.query('INSERT INTO todo (todo) VALUES ($1)', [todo])
}
  
run()
