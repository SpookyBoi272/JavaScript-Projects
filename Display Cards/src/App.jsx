import { useState, useEffect } from "react"
import Card from "./assets/components/card"


function App() {
  const [cards, setCards] = useState([])
  const fetchdata = async () => {
    let data = await fetch('https://jsonplaceholder.typicode.com/posts');
    let parsedData = await data.json();
    setCards(parsedData);
  }

  useEffect(() => {
    fetchdata();
  }, [])
  



  return (
    <div className="cards">
    {
      cards.map((item) =>{
        return <Card title={item.title} desc={item.body} key={item.id}/>
      })
    }
    </div>
  )
}

export default App
