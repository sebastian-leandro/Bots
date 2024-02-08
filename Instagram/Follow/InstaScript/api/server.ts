import express, { type Application } from 'express'
import cors from 'cors'

import { existsSync } from 'fs'

const router = express.Router()

const options = {
  origin: 'http://localhost:3000',
  credentials: true
}

router.use(cors(options))

router.get('/logged', (req, res) => {
  const path = process.cwd() + '/src/cookies/cookies.json'
  if (existsSync(path)) {
    res.status(200).json({ logged: true })
  } else {
    res.status(200).json({ logged: false })
  }
})

router.post('/login', (req, res) => {
  try {
    const { user, password } = req.body
    if (!user || !password) { return res.status(400).json({ message: 'Invalid request.' }) }
    return res.status(200).json({ message: 'Logged in.' })
  } catch (err) { res.status(500).json({ message: 'An error occurred. Please try again later.' }) }
})

export function attachRoutes (app: Application): void {
  app.use('/', router)
}
