import React from 'react'

const card = ({card}) => {
  return (
    <div className='card m-5'>
      <h2>{card.title}</h2>
      <p>ID: {card.id}</p>
    </div>
  )
}

export default card
