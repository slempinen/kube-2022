const crypto = require('node:crypto')
const express = require('express')
const fs = require('fs/promises')

const app = express()
const port = process.env.PORT || 3000
const timestampFilePath = process.env.TIMESTAMP_FILEPATH || '../writer/timestamp.txt'

const hash = crypto.randomBytes(20).toString('hex');

const getOutput = async () => {
  const time = await fs.readFile(timestampFilePath)
  return `${time}: ${hash}`
}

const logLoop = async () => {
  time = new Date()
  const output = await getOutput()
  console.log(output)
  setTimeout(logLoop, 5000)
}

app.get('/', async (req, res) => {
  const output = await getOutput()
  res.send(output)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})

logLoop()
