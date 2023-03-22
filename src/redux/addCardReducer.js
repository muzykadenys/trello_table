import {
  ADD_CARD_CLEAR,
  ADD_CARD_CONTENT,
  ADD_CARD_LISTID,
} from './reducersConsts'

const initState = {
  listId: '',
  cardContent: '',
}

const addCardReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_CARD_LISTID:
      return {
        ...state,
        listId: action.payload,
      }
    case ADD_CARD_CONTENT:
      return {
        ...state,
        cardContent: action.payload,
      }
    case ADD_CARD_CLEAR:
      return {
        ...state,
        cardContent: '',
        listId: '',
      }
    default:
      return state
  }
}

export default addCardReducer
