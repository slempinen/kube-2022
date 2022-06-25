import fetch from 'node-fetch'
import fs from 'fs/promises'
import fsSync from 'fs'
import path from 'path'

const imagePath = process.env.IMAGE_PATH || path.join(__dirname, 'image.jpg')

const handler = async (req, res) => {
  res.setHeader('Content-Type', 'image/jpg')
  const imageExists = fsSync.existsSync(imagePath)
  if (!imageExists) {
    const imgRes = await fetch('https://picsum.photos/1200')
    const image = await imgRes.buffer()
    await fs.writeFile(imagePath, image)
    res.send(image)
  }
  const image = await fs.readFile(imagePath)
  res.send(image)
}

export default handler
