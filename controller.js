const { Card, List } = require('./schema')

async function findCardInList(cardId, listId) {
  const list = await List.findById(listId)
  const card = list.cards.filter((el) => el.id == cardId)
  return card[0]
}
async function findList(prop) {
  const list = await List.find(prop)
  return list
}

async function addCard(listId, cardContent) {
  var card
  if (cardContent != '') {
    const list = await List.findById(listId)

    card = await new Card({ content: cardContent })

    list.cards = await [...list.cards, card]

    await list.save()
    console.log(`card is created`)
  }
}
async function addList(listTitle) {
  var list
  if (listTitle != '') {
    list = await new List({ title: listTitle })
    await list.save()
    console.log(`list <${listTitle}> is created`)
  }
}

async function deleteList(listId) {
  const list = await List.findById(listId)
  await List.deleteOne({ _id: listId })
  console.log(`list <${list.title}> is DELETED`)
}
async function deleteCard(cardId, listId) {
  const list = await List.findById(listId)
  list.cards = list.cards.filter((el) => el.id != cardId)

  list.save()
  console.log(`card from list <${list.title}> is DELETED`)
}

async function updateCardPosition(cardId, prev_listId, new_listId) {
  const prev_list = await List.findById(prev_listId)
  const new_list = await List.findById(new_listId)
  const card = await findCardInList(cardId, prev_listId)

  await deleteCard(cardId, prev_listId)
  new_list.cards = await [...new_list.cards, card]

  //   console.log(card)

  new_list.save()
  console.log(
    `card moved from list <${prev_list.title}> to <${new_list.title}>`,
  )
}

module.exports = {
  findCardInList: findCardInList,
  findList: findList,

  addList: addList,
  addCard: addCard,

  deleteList: deleteList,
  deleteCard: deleteCard,

  updateCardPosition: updateCardPosition,
}
