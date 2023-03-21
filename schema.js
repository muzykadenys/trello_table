const mongoose = require('mongoose')

const CARD = 'Card'
const LIST = 'List'

const cardSchema = new mongoose.Schema({
  content: String,
  changeDate: {
    type: Date,
    default: () => Date.now(),
  },
})

const listSchema = new mongoose.Schema({
  title: String,
  cards: {
    type: [cardSchema],
    default: [],
  },
})

module.exports = {
  Card: mongoose.model(CARD, cardSchema),
  List: mongoose.model(LIST, listSchema),
  CARD: CARD,
  LIST: LIST,
}
