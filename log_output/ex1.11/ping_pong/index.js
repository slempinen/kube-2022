const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const pingsFilePath = process.env.PINGS_FILEPATH || './pings.txt'
const fs = require('fs/promises')

let pings = 0

const writePings = async () => {
  await fs.writeFile(pingsFilePath, String(pings))
}

app.get('/', (req, res) => {
  res.send(`pong ${pings}`)
  pings = pings + 1
  writePings()
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
  writePings()
})
