import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/card.jsx'

function App() {
  const [cards, setCards] = useState([]);

  const fetchCardsPage = async (pageNO) => {
    const apiLink = "http://127.0.0.1:3000";
    const data = await fetch(`${apiLink}/v1/getPg/${pageNO}`);
    const cards = await data.json();
    setCards(cards);
    console.log(cards)
  }

  useEffect(() => {
    fetchCardsPage(1);
  }, [])


  return (
    <>
      <div className="cards-container flex m-0 p-0 w-screen">
        {cards.map((card, index) => {
          return <Card key={index} card={card} />
        })}

      </div>
    </>
  )
}

export default App
