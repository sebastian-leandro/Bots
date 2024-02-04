import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

const port = 3001

app.use(express.json())

app.post('/src/components/login', (req, res) => {
  const { username, password } = req.body

  console.log(username, password)

  const responseData = { username, password }
  res.json(responseData)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
