import React from 'react'
import Tools from './Tools'
import ColorContainer from './ColorContainer.js'
import Brush from './Brush'
import './Header.css'
function Header({ handleUtensil }) {
  return (
    <>
      <div id="top-page">
        <p>🎨 untitled - Paint</p>
       
      </div>
      <div id="header">
        <Tools handleUtensil={handleUtensil} />
        <Brush handleUtensil={handleUtensil} />
        <ColorContainer handleUtensil={handleUtensil} />
      </div>
    </>
  )
}

export default Header
