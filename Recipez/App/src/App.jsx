import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cards, setCards] = useState([]);

  const fetchCardsPage = async (pageNO) => {
    const apiLink = "http://127.0.0.1:3000";
    fetch(`${apiLink}/v1/getPg/${pageNO}`).then(async (cards) =>{
      console.log(cards);
      setCards(await cards.json());
    })
  }

  useEffect(() => {
    fetchCardsPage(1);
  }, [])
  

  return (
    <>
    
    </>
  )
}

export default App
