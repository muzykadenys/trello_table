import React, { useEffect, useState } from 'react'
import '../Card/card.scss'
import { IonIcon } from '@ionic/react'
import { trashOutline } from 'ionicons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_LIST_SECCESS } from '../../redux/reducersConsts'
import axios from 'axios'

function Card({ data, listId }) {
  const dispatch = useDispatch()
  const changeDataLists = (val) => {
    dispatch({ type: FETCH_LIST_SECCESS, payload: val })
  }

  const state = useSelector((state) => state)
  const lists = state.lists
  const domain = state.start.domain
  const { _id, content, changeDate } = data
  const [hoverTrash, setHoverTrash] = useState(false)
  const activeWordTrash = 'activeWordTrash'

  //   const [timeDif, setTimeDif] = useState()
  // ---------------------------------------

  const deleteCard = () => {
    const url = `${domain}/deleteCard`
    const submitData = { cardId: _id, listId: listId }

    const deleteCardFromList = () => {
      const def = lists.data
      const ret = def.map((el, index) => {
        const temp = el
        temp.cards = el.cards.filter((el_card) => el_card._id != _id)
        return temp
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
        console.log('success delete card')
        const def = deleteCardFromList()
        changeDataLists(def)
      })
      .catch((e) => {
        console.log(`error in delete card: ${e.message}`)
      })
  }

  const cardDeleteOnClick = () => {
    deleteCard()
  }

  function dateDifference(date1, date2) {
    const oneDay = 1000 * 60 * 60 * 24

    const date1Ms = date1.getTime()
    const date2Ms = date2.getTime()

    let differenceMs = Math.abs(date2Ms - date1Ms)
    const seconds = Math.floor(differenceMs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / oneDay)
    const weeks = Math.floor(days / 7)

    return {
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days,
      weeks: weeks,
    }
  }

  const setTimeDif = () => {
    const date_1 = new Date()
    const date_2 = new Date(changeDate)
    const times = dateDifference(date_1, date_2)

    if (times.weeks > 0) return `${times.weeks} weeks ago`
    else if (times.days > 0) return `${times.days} days ago`
    else if (times.hours > 0) return `${times.hours} hours ago`
    else if (times.minutes > 0) return `${times.minutes} minutes ago`
    else if (times.seconds > 0) return `${times.seconds} seconds ago`
    else return 'just created'
  }

  return (
    <div className="CardSection">
      <div className="CardSection_lastChange">
        <div className="CardSection_lastChange_text">{setTimeDif()}</div>
        <div
          className="CardSection_lastChange_delete"
          onClick={cardDeleteOnClick}
          onMouseEnter={() => setHoverTrash(true)}
          onMouseLeave={() => setHoverTrash(false)}
        >
          <IonIcon
            className={`MainPageSection_add_icon ${
              hoverTrash ? activeWordTrash : ''
            }`}
            icon={trashOutline}
          />
        </div>
      </div>
      <div className="CardSection_content">{content}</div>
    </div>
  )
}

export default Card
