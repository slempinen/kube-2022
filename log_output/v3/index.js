const crypto = require('node:crypto')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const hash = crypto.randomBytes(20).toString('hex');
let time 

const getOutput = () => {
  return `${time.toISOString()}: ${hash}`
}

const logLoop = () => {
  time = new Date()
  console.log(getOutput())
  setTimeout(logLoop, 5000)
}

app.get('/', (req, res) => {
  res.send(getOutput())
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})

logLoop()
