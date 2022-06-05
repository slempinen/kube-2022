const crypto = require('node:crypto')

const hash = crypto.randomBytes(20).toString('hex');

const logLoop = () => {
  const time = new Date()
  console.log(`${time.toISOString()}: ${hash}`)
  setTimeout(logLoop, 5000)
}

logLoop()
