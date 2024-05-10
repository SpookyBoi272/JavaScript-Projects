import React from 'react'
import './card.css'

function card(props) {
  return (
    <div className='card'>
      <h3>{props.title}</h3>
      <p>{props.desc}</p>
    </div>
  )
}

export default card
