const express = require('express')
const app = express()
const fetch = require('node-fetch')
const fs = require('fs/promises')
const fsSync = require('fs')
const port = process.env.PORT || 3000
const path = require('path')
const imagePath = process.env.IMAGE_PATH || path.join(__dirname, 'image.jpg')

app.listen(port, async () => {
  console.log(`Server started in port ${port}`)
})

app.get('/image.jpg', async (req, res) => {
  const imageExists = fsSync.existsSync(imagePath)
  if (!imageExists) {
    const imgRes = await fetch('https://picsum.photos/1200')
    const image = await imgRes.buffer()
    await fs.writeFile(imagePath, image)
  }
  res.sendFile(imagePath)
})

app.get('/', (req, res) => {
  res.send(`
    <img src="image.jpg" />
    Hello Kubernetes!
    `)
})

