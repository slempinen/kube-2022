const fs = require('fs/promises')

const timestampFilePath = process.env.TIMESTAMP_FILEPATH || './timestamp.txt'

let time 

const timestampLoop = async () => {
  time = new Date()
  await fs.writeFile(timestampFilePath, time.toISOString())
  setTimeout(timestampLoop, 5000)
}

timestampLoop()
