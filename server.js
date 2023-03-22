const express = require('express')
const mongoose = require('mongoose')
const controller = require('./controller')
const app = express()
app.use(express.json())
var cors = require('cors')

app.use(cors())

const URL =
  'mongodb+srv://warris:WarrisPassword@boardcluster.0sttbjl.mongodb.net/?retryWrites=true&w=majority'

async function connectMongoose() {
  try {
    await mongoose.connect(URL)
    console.log('Connect to mongoDB!')
  } catch (e) {
    console.log('Connection to MongoDB error:', e.message)
  }
}
connectMongoose()

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.get('/lists', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  try {
    const lists = await controller.findList()
    res.status(201).json(lists)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

app.post('/addCard', async (req, res) => {
  try {
    const card = await controller.addCard(req.body.listId, req.body.cardContent)
    res.status(201).json(card)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})
app.post('/addList', async (req, res) => {
  try {
    const card = await controller.addList(req.body.listTitle)
    res.status(201).json(card)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})
app.post('/updateLists', async (req, res) => {
  try {
    const lists = await controller.updateAllLists(req.body.lists)
    res.status(201)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})
app.post('/deleteCard', async (req, res) => {
  try {
    const card = await controller.deleteCard(req.body.cardId, req.body.listId)
    res.status(201).json({message: "success"})
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})
app.post('/deleteList', async (req, res) => {
  try {
    const list = await controller.deleteList( req.body.listId)
    res.status(201).json({message: "success"})
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
