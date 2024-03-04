import express, { Router } from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import cors from 'cors'
import http from 'node:http'
import { unlink } from 'node:fs'
import { join } from 'node:path'

import { authenticateToken, generateToken } from './middleware.js'

import { login } from '../src/functions/login.js'
import { follow } from '../src/process/follow.js'
import { unfollow } from '../src/process/unfollow.js'

const PORT = process.env.PORT ?? 1234
const Cookiepath: string = join(process.cwd(), 'cookies', 'cookies.json')
const imagePath: string = join(process.cwd(), 'public', 'assets', 'profile.jpg')

const options = {
  origin: 'http://localhost:3000',
  credentials: true
}

const expressApp = express()
expressApp.use(cors(options))
expressApp.use(express.json())

const router = Router()

router.get('/logged', authenticateToken, (req, res) => { return res.status(200).json({ logged: true }) })

router.get('/logout', (req, res) => {
  try {
    Promise.all([
      new Promise<void>((resolve, reject) => {
        unlink(Cookiepath, (err) => {
          if (err !== null) reject(err)
          else resolve()
        })
      }).catch((err) => { console.error(err) }),
      new Promise<void>((resolve, reject) => {
        unlink(imagePath, (err) => {
          if (err !== null) reject(err)
          else resolve()
        })
      }).catch((err) => { console.error(err) })
    ]).then(() => {
      return res.status(200).json({ message: 'Logout Successful' })
    }).catch((err) => {
      console.error(err)
      return res.status(500).json({ message: 'Logout Failed' })
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'There was a problem. Try again' })
  }
})

router.post('/login', [
  body('username').trim().escape(),
  body('password').trim().escape()
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { username, password } = req.body
    if (typeof username !== 'string' || typeof password !== 'string' || username.length < 3 || password.length < 3) {
      return res.status(400).json({ logged: false, message: 'Username or password are too short or invalid. Please try again' })
    }
    const user = await login(username, password)
    if (user) {
      const token = generateToken({ username })
      return res.status(200).json({ logged: true, message: 'Login successful', token })
    } else {
      return res.status(400).json({ logged: false, message: 'Username or password are incorrect. Please try again' })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'There was a problem. Try again' })
  }
})

router.post('/action', async (req, res) => {
  const { action } = req.body
  if (typeof action !== 'string') return res.status(400).json({ message: 'Invalid action' })
  try {
    await login()
    switch (action) {
      case 'follow': {
        await follow()
        break
      }
      case 'unfollow': {
        await unfollow()
        break
      }
      default: {
        return res.status(400).json({ message: 'Invalid action' })
      }
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'There was a problem. Please try again' })
  }
})

expressApp.use('/', router)

const httpServer = http.createServer(expressApp)

export function startServer (): void {
  httpServer.listen(PORT, () => {
    console.log('Server running at port: ', PORT)
  })
}
