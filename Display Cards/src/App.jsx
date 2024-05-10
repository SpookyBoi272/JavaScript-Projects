import Card from "./assets/components/card"

function App() {

  

  const result = fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())

  


  return (
    <>
     <Card title = "Hello" desc = "Diskription"/>
    </>
  )
}

export default App
