import React from 'react'
import '../Card/card.scss'

function Card({ data }) {
  const { _id, content, changeDate } = data
  return (
    <div className="CardSection">
      <div className="CardSection_lastChange">2 ago</div>
      <div className="CardSection_content">{content}</div>
    </div>
  )
}

export default Card
