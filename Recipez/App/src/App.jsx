import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card.jsx'
import Navbar from './components/Navbar.jsx';

function App() {
  const [cards, setCards] = useState([]);

  const fetchCardsPage = async (pageNO) => {
    const apiLink = "http://127.0.0.1:3000";
    try {
      const response = await fetch(`${apiLink}/v1/getPg/${pageNO}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cards = await response.json();
      setCards(cards);
      console.log(cards)
    } catch {
      console.error("Error fetching the data");
    }
  }

  useEffect(() => {
    fetchCardsPage(1);
  }, [])


  return (
    <>
    <div className='bodyholder bg-siteBg px-16 py-4'>
      <Navbar/>
      <div className="cards-container grid grid-cols-3">
        {cards.map((card, index) => {
          return <Card key={index} card={card} />
        })}

      </div>
      </div>
    </>
  )
}

export default App
