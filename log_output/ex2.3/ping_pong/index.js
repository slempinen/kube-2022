const express = require('express')
const app = express()
const port = process.env.PORT || 4000

let pings = 0

app.get('/', (req, res) => {
  res.send(`pong ${pings}`)
  pings = pings + 1
})

app.get('/pings', (req, res) => {
  res.json({ pings })
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
