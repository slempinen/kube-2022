const crypto = require('node:crypto')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const axios = require('axios')
const PING_PONG_APP_URL = process.env.PING_APP_URL || 'http://localhost:4000'
const MESSAGE = process.env.MESSAGE || ''

const hash = crypto.randomBytes(20).toString('hex');
let time 

const getTimestamp = () => {
  return `${time.toISOString()}: ${hash}`
}

const getOutput = async () => {
  const timestamp = getTimestamp()
  const ping_response = await axios.get(`${PING_PONG_APP_URL}/pings`)
  const pings = ping_response.data.pings
  return `${MESSAGE}</br>${timestamp}</br>Ping / Pongs: ${pings}`
}

const logLoop = async () => {
  time = new Date()
  console.log(getTimestamp())
  setTimeout(logLoop, 5000)
}

app.get('/', async (req, res) => {
  res.send(await getOutput())
})

app.get('/health', async (req, res) => {
  try {
    await getOutput()
    res.sendStatus(200)
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})

logLoop()
