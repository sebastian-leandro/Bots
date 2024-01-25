import express from 'express'

const app = express()
const PORT = 3000

app.get('/api/data', (req, res) => {
  res.json({ name: 'John', age: 30 })
})

app.post('/api/data', (req, res) => {
  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})
