import React from 'react'
import Tools from './Tools.jsx'
import ColorContainer from './ColorContainer.jsx'
import Brush from './Brush.jsx'
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
