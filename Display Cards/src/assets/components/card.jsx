import React from 'react'
import './card.css'

function card(props) {
  return (
    <div className='card'>
      <div>{props.title}</div>
      <div>{props.desc}</div>
    </div>
  )
}

export default card
