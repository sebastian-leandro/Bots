import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

const port = 3001

app.use(express.json())

app.post('/src/api/login', (req, res) => {
  try {
    const { username, password } = req.body

    if (username.length < 5 || password.length < 5) {
      return res.status(400).json({ message: 'Username or password must be at least 5 characters long.' })
    }

    res.status(200).json({ message: 'Login successful' })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/src/api/account', (req, res) => {
  const { account } = req.body

  if (account === '') return res.status(400).json({ message: 'account is empty' })

  const responseData = { account }
  res.json(responseData)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
