const crypto = require('node:crypto')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const pingsFilePath = process.env.PINGS_FILEPATH || '../ping_pong/pings.txt'
const fs = require('fs/promises')

const hash = crypto.randomBytes(20).toString('hex');
let time 

const getTimestamp = () => {
  return `${time.toISOString()}: ${hash}`
}

const getOutput = async () => {
  const timestamp = getTimestamp()
  const pings = await fs.readFile(pingsFilePath)
  return `${timestamp}</br>Ping / Pongs: ${pings}`
}

const logLoop = async () => {
  time = new Date()
  console.log(getTimestamp())
  setTimeout(logLoop, 5000)
}

app.get('/', async (req, res) => {
  res.send(await getOutput())
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})

logLoop()
