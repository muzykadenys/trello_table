import { CHANGE_CURRENT_BOARD, CHANGE_CURRENT_CARD } from './reducersConsts'

const initState = {
  currentBoard: {},
  currentCard: {},
}

const dragableReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_BOARD:
      return {
        ...state,
        currentBoard: action.payload,
      }
    case CHANGE_CURRENT_CARD:
      return {
        ...state,
        currentCard: action.payload,
      }
    default:
      return state
  }
}

export default dragableReducer
