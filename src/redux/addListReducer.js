import { ADD_LIST_CLEAR, ADD_LIST_TITLE } from './reducersConsts'

const initState = {
  listTitle: '',
}

const addListReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_LIST_TITLE:
      return {
        ...state,
        listTitle: action.payload,
      }
    case ADD_LIST_CLEAR:
      return {
        ...state,
        listTitle: '',
      }
    default:
      return state
  }
}

export default addListReducer
