const express = require('express')
const mongoose = require('mongoose')
const controller = require('./controller')
const app = express()

const URL =
  'mongodb+srv://warris:WarrisPassword@boardcluster.0sttbjl.mongodb.net/?retryWrites=true&w=majority'

async function connectMongoose() {
  try {
    await mongoose.connect(URL)
    console.log('Connect to mongoDB!')

    // controller.initCollections()
    // console.log((await controller.findListsCollection())[0].lists)
    // controller.addList('secont_list')
    // controller.addCard("641a1e9d25972f0da0579772", "some card_3")
    // controller.deleteCard('641a1ac2c8352435f64e35c5', '641a16e8fca9340acf63492b')
    // controller.deleteList('641a1e42be5d1a2fba5cbb70')

    controller.updateCardPosition('641a20f872aba686e86e4df6', '641a1e9d25972f0da0579772', '641a1ed04a8b06c64cde0cac')
    // console.log(await controller.findCardInList('641a20f872aba686e86e4df6','641a1e9d25972f0da0579772'))

  } catch (e) {
    console.log('Connection to MongoDB error:', e.message)
  }
}
connectMongoose()

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.listen(3333, () => {
  console.log('Server running on port 3333')
})
