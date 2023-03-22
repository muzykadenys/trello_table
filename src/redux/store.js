import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import listReducer from './listsReducer'
import dragableReducer from './dragableReducer'
import addCardReducer from './addCardReducer'
import startReducer from './startReducer'
import addListReducer from './addListReducer'


const rootReducer = combineReducers({
    lists: listReducer,
    dragable: dragableReducer,
    addCard: addCardReducer,
    addList: addListReducer,
    start: startReducer,
})


export const store = createStore(rootReducer, composeWithDevTools())