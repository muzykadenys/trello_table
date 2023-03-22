import { IonIcon } from '@ionic/react'
import { addOutline } from 'ionicons/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ADD_CARD_CLEAR,
  ADD_CARD_CONTENT,
  ADD_CARD_LISTID,
  ADD_LIST_CLEAR,
  ADD_LIST_TITLE,
  FETCH_LIST_ERROR,
  FETCH_LIST_SECCESS,
} from '../../redux/reducersConsts'
import InputForm from '../List/InputForm/InputForm'
import List from '../List/List'
import '../MainPage/mainPage.scss'
import Popup from '../Popup/Popup'

function MainPage() {
  const dispatch = useDispatch()

  const changeDataLists = (val) => {
    dispatch({ type: FETCH_LIST_SECCESS, payload: val })
  }
  const changeErrorLists = (val) => {
    dispatch({ type: FETCH_LIST_ERROR, error: val })
  }
  const changeAddCardListId = (val) => {
    dispatch({ type: ADD_CARD_LISTID, payload: val })
  }
  const changeAddCardCardContent = (val) => {
    dispatch({ type: ADD_CARD_CONTENT, payload: val })
  }
  const changeAddCardCardClear = () => {
    dispatch({ type: ADD_CARD_CLEAR })
  }

  const changeAddListTitle = (val) => {
    dispatch({ type: ADD_LIST_TITLE, payload: val })
  }
  const changeAddListClear = () => {
    dispatch({ type: ADD_LIST_CLEAR })
  }

  const state = useSelector((state) => state)
  const lists = state.lists
  const domain = state.start.domain
  const { listId, cardContent } = state.addCard
  const { listTitle } = state.addList

  const [isPopup, setIsPopup] = useState(false)
  const [isPopupAddList, setIsPopupAddList] = useState(false)
  // ----------------------------------

  const fetchLists = () => {
    const url = `${domain}/lists`
    axios
      .get(url)
      .then((res) => {
        console.log('success fetching')
        changeDataLists(res.data)
      })
      .catch((e) => {
        console.log(`error in fetching list: ${e.message}`)
        changeErrorLists(e)
      })
  }

  const postCard = () => {
    const url = `${domain}/addCard`
    const submitData = {
      listId: listId,
      cardContent: cardContent,
    }

    const addCardToList = (res) => {
      const def = lists.data
      const ret = def.map((el, index) => {
        if (el._id === listId) {
          el.cards.push(res)
        }
        return el
      })
      return ret
    }

    axios
      .post(url, submitData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('success card post')
        const def = addCardToList(res.data)
        changeDataLists(def)
      })
      .catch((e) => {
        console.log(`error in card post: ${e.message}`)
      })
  }

  const postList = () => {
    const url = `${domain}/addList`
    const submitData = { listTitle: listTitle }

    const addListToList = (res) => {
      const def = lists.data
      def.push(res.data)
      return def
    }

    axios
      .post(url, submitData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('success list post')
        const def = addListToList(res)
        changeDataLists(def)
      })
      .catch((e) => {
        console.log(`error in list post: ${e.message}`)
      })
  }

  const addListOnClick = () => {
    setIsPopupAddList(true)
  }

  useEffect(() => {
    if (listId !== '' && cardContent !== '') {
      postCard()
      changeAddCardCardClear()
    }
  }, [listId, cardContent])

  useEffect(() => {
    if (listTitle !== '') {
      postList()
      changeAddListClear()
    }
  }, [listTitle])

  // getting data on start app
  useEffect(() => {
    fetchLists()
  }, [])

  return (
    <>
      {isPopup && !isPopupAddList ? (
        <div>
          <Popup setIsVisible={setIsPopup}>
            <InputForm getInputValue={changeAddCardCardContent} />
          </Popup>
        </div>
      ) : null}

      {isPopupAddList && !isPopup ? (
        <div>
          <Popup setIsVisible={setIsPopupAddList}>
            <InputForm getInputValue={changeAddListTitle} />
          </Popup>
        </div>
      ) : null}

      <div className="MainPageSection">
        {!lists.loading ? (
          <>
            {lists.data.map((el, index) => (
              <List setIsPopup={setIsPopup} key={`MPS_${index}`} data={el} />
            ))}
            <div className="MainPageSection_addList">
              <div onClick={addListOnClick} className="MainPageSection_add">
                <IonIcon
                  className="MainPageSection_add_icon"
                  icon={addOutline}
                />
              </div>
            </div>
          </>
        ) : (
          <div>loading</div>
        )}
      </div>
    </>
  )
}

export default MainPage
