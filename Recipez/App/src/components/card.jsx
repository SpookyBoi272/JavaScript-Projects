import React from 'react'

const card = ({ card }) => {
  return (
    <div className='card m-2 bg-gray-400'>
      <h2>{card.title}</h2>
      <div className="ner-container">
        {card.NER.map((NER, index) => {
          return <button className="bg-red-200 rounded-lg m-1 px-1" key={index}> {NER.name} </button>
        })}
      </div>
    </div>
  )
}

export default card
