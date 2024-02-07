import express from 'express';
import cors from 'cors';
import { existsSync } from 'node:fs';
import * as path from 'path'
import { handleInit } from '../logic/index.js'

let username = ''
let password = ''
let account = ''

const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

router.use(cors(corsOptions));

router.get('/logged', (req, res) => {
  const filePath = path.join(process.cwd(), './cookies/cookies.json')
  const isLogged = existsSync(filePath)
  res.status(200).json({logged: isLogged})
})

router.post('/login', (req, res) => {
  const { username, password, account } = req.body;
  if (username.length < 5 || password.length < 5 || account.length < 5) {
    return res.status(400).json({ message: 'Invalid input' });
  }
  username = username
  password = password
  account = account
  res.status(200).json({ username, password, account });
});

router.post('/init', async (req, res) => {
  try {
    await handleInit(username, password, account)
  } catch (err) { return res.status(500).json({ message: 'Error initializing' }) }
  res.status(200).json({ message: 'Init successful' });
})

export default function attachRoutes(app) {
  app.use('/', router);
}