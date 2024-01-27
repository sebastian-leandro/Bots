import express, { type Request, type Response } from 'express'

const app = express()
const PORT = 3000

app.use(express.json()) // Middleware to parse incoming JSON data

app.get('/api/data', (req, res) => {
  res.json({ name: 'John', age: 30 })
})

app.post('/api/data', (req: Request, res: Response) => {
  // Parse incoming JSON data
  const { username, password } = req.body
  console.log(username, password)
  // Perform any necessary logic with username and password
  // For now, just respond with success
  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})
