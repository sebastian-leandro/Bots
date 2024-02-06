/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { start } from '../functions/index.ts'

const app = express()

const config = {
  USER: process.env.USER ?? '',
  PASSWORD: process.env.PASSWORD ?? '',
  HOST: process.env.HOST ?? ''
}

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(helmet())
app.use(express.json())

const validate = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | undefined> => {
  const { USER, PASSWORD, HOST } = config
  if (USER.length < 3 || PASSWORD.length < 3 || HOST.length < 3) {
    return res.status(400).send('Invalid input')
  }
  req.on('error', (err: any) => {
    console.error(err)
    res.status(500).send('Server failed to start')
  })
  next()
  return undefined
}

app.post('/src/api/login', (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    config.USER = username
    config.PASSWORD = password
    res.status(200).send('Login successful')
  }
})

app.post('/src/api/account', (req, res) => {
  config.HOST = req.body.account
  res.status(200).send('Account set')
})

app.post('/src/api/start', validate, async (req, res) => {
  const { USER, PASSWORD, HOST } = config
  const { active } = req.body
  if (active) {
    try {
      await start(USER, PASSWORD, HOST)
      res.status(200).send('Server started')
    } catch (err) { res.status(500).send('Server failed to start') }
  }
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
