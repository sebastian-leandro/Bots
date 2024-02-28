import express, { Router } from 'express'
import cors from 'cors'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import { existsSync } from 'fs'

import { login } from '../src/functions/login.js'
import { follow, unfollow } from '../src/index.js'

const PORT = process.env.PORT ?? 1234
const options = {
  origin: 'http://localhost:3000',
  credentials: true
}

const expressApp = express()
expressApp.use(cors(options))
expressApp.use(express.json())

const router = Router()

router.get('/logged', (req, res) => {
  const path = process.cwd() + '/cookies/cookies.json'
  if (existsSync(path)) {
    return res.status(200).json({ logged: true })
  }
  return res.status(200).json({ logged: false })
})

router.post('/login', async (req, res) => {
  const { user, password } = req.body
  if (typeof user !== 'string' || typeof password !== 'string') {
    res.status(400).json('Invalid type of data.')
    return
  }
  try {
    const logged = await login(user, password)
    if (logged) {
      res.status(200).json({ logged: true })
    } else {
      res.status(400).json({ logged: false, message: 'Invalid Username or Password, Try again.' })
    }
  } catch (error) { res.status(500).json({ error: 'Login failed' }) }
})

router.post('/actions', async (req, res) => {
  const { action } = req.body

  try {
    switch (action) {
      case 'follow': {
        res.status(200).json({ follow: 'follow' })
        break
      }
      case 'unfollow': {
        res.status(200).json({ follow: 'unfollow' })
        break
      }
      case 'like': {
        res.status(200).json({ follow: 'like' })
        break
      }
      case 'message': {
        res.status(200).json({ follow: 'message' })
        break
      }
      default: {
        res.status(400).json({ message: 'Invalid Action' })
      }
    }
  } catch (err) { res.status(500).json({ message: err }) }
})

router.post('/follow', async (req, res) => {
  const { input } = req.body
  try {
    if (typeof input === 'string') await follow(input)
  } catch (err) { res.status(500).json({ error: err as string }) }
})

router.post('/unfollow', async (req, res) => {
  try {
    await unfollow()
  } catch (err) { res.status(500).json({ error: err as string }) }
})

expressApp.use('/', router)

const httpServer = http.createServer(expressApp)
const io = new SocketServer(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

io.on('connection', (socket) => {
  console.log('New client connected ', socket.id)

  socket.on('disconnect', () => {
    console.log('Client disconnect', socket.id)
  })
})

export function startServer (): void {
  httpServer.listen(PORT, () => {
    console.log('Server running at port: ', PORT)
  })
}
