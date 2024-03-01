import express, { Router } from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import cors from 'cors'
import http from 'node:http'
import { existsSync, unlink } from 'node:fs'
import { join } from 'node:path'

import { login } from '../src/functions/login.js'

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

router.get('/logged', (req, res) => {
  if (existsSync(Cookiepath)) {
    return res.status(200).json({ logged: true })
  }
  return res.status(200).json({ logged: false })
})

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
  const { username, password } = req.body
  if (typeof username !== 'string' || typeof password !== 'string' || username.length < 3 || password.length < 3) {
    return res.status(400).json({ message: 'Invalid Username or Password. Try Again' })
  }

  try {
    const loggedIn = await login(username, password)
    if (loggedIn === true) return res.status(200).json({ logged: true, message: 'Login succesful' })
    else return res.status(400).json({ logged: false, message: 'Invalid username or password' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ loggedIn: false, message: 'There was a problem. Please try again' })
  }
})

expressApp.use('/', router)

const httpServer = http.createServer(expressApp)

export function startServer (): void {
  httpServer.listen(PORT, () => {
    console.log('Server running at port: ', PORT)
  })
}
