import React, { useState } from 'react'
import Header from './Header'
import './style.css'
import Container from './Container'



function App() {
  const [utensil, setUtensil] = useState({
    tool: 'brush',
    weight: 'thickness',
    color: 'black',
  })

  function handleUtensil(updateItem, keyHolder) {
    const newUtensil = { ...utensil }

    if (updateItem === 'eraser') {
      newUtensil['color'] = 'white'
      newUtensil['tool'] = 'brush'
      setUtensil(newUtensil)
    } 
    else {
      newUtensil[keyHolder] = updateItem.toLowerCase()
      setUtensil(newUtensil)
    }

    console.log(newUtensil)
  }

  return (
    <div>
      <h1>Tasman's Canvas</h1>
      <Header handleUtensil={handleUtensil} />
      <Container utensil={utensil} />
    </div>
  )
}

export default App
