import { IonIcon } from '@ionic/react'
import axios from 'axios'
import { addOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ADD_CARD_LISTID,
  CHANGE_CURRENT_BOARD,
  CHANGE_CURRENT_CARD,
  FETCH_LIST_ERROR,
  FETCH_LIST_SECCESS,
} from '../../redux/reducersConsts'
import Card from '../Card/Card'
import '../List/list.scss'
import Popup from '../Popup/Popup'
import InputForm from './InputForm/InputForm'

function List({ data, setIsPopup }) {
  const dispatch = useDispatch()

  const changeDataLists = (val) => {
    dispatch({ type: FETCH_LIST_SECCESS, payload: val })
  }
  const changeErrorLists = (val) => {
    dispatch({ type: FETCH_LIST_ERROR, error: val })
  }
  const setCurrentBoard = (val) => {
    dispatch({ type: CHANGE_CURRENT_BOARD, payload: val })
  }
  const setCurrentCard = (val) => {
    dispatch({ type: CHANGE_CURRENT_CARD, payload: val })
  }
  const changeAddCardListId = (val) => {
    dispatch({ type: ADD_CARD_LISTID, payload: val })
  }

  const state = useSelector((state) => state)
  const lists = state.lists
  const domain = state.start.domain
  const { currentBoard, currentCard } = state.dragable
  const { _id, title, cards } = data
  // ==================================

  const updateLists = (lists) => {
    const url = `${domain}/updateLists`
    const submitData = { lists: lists }

    axios
      .post(url, submitData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('success update lists')
      })
      .catch((e) => {
        console.log(`error in update lists: ${e.message}`)
      })
  }

  const dragOverHandler = (e) => {
    e.preventDefault()
  }
  const dragLeaveHandler = (e) => {}
  const dragStartHandler = (e, board, card) => {
    setCurrentBoard(board)
    setCurrentCard(card)
  }
  const dragEndHandler = (e) => {}

  const dropHandler = (e, board, card) => {
    e.preventDefault()

    const currentIndex = currentBoard.cards.indexOf(currentCard)
    currentBoard.cards.splice(currentIndex, 1)
    const dropIndex = board.cards.indexOf(card)
    board.cards.splice(dropIndex + 1, 0, currentCard)
    const res = lists.data.map((el, index) => {
      if (el._id === board._id) {
        return board
      }
      if (el._id === currentBoard._id) {
        return currentBoard
      }
      return el
    })
    changeDataLists(res)
    updateLists(res)
  }

  const dropCardHandler = (e, board) => {
    e.preventDefault()
    if (board.cards.length === 0) {
      board.cards.push(currentCard)
      const currentIndex = currentBoard.cards.indexOf(currentCard)
      currentBoard.cards.splice(currentIndex, 1)
      const res = lists.data.map((el, index) => {
        if (el._id === board._id) {
          return board
        }
        if (el._id === currentBoard._id) {
          return currentBoard
        }
        return el
      })
      changeDataLists(res)
      updateLists(res)
    }
  }

  const addCardOnClick = (e) => {
    // const res = [...lists.data, ]
    changeAddCardListId(_id)
    setIsPopup(true)
  }

  // useEffect(() => {
  //   console.log(isPopup)
  // }, [isPopup])

  return (
    <>
      <div
        className="ListSection"
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropCardHandler(e, data)}
      >
        <div className="ListSection_title">{title}</div>

        <div className="ListSection_cards">
          {cards.map((el, index) => (
            <div
              draggable={true}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, data, el)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, data, el)}
              key={`LSC_${index}`}
            >
              <Card data={el} />
            </div>
          ))}
        </div>

        <div onClick={addCardOnClick} className="ListSection_add">
          <IonIcon className="listSection_add_icon" icon={addOutline} />
        </div>
      </div>
    </>
  )
}

export default React.memo(List)
