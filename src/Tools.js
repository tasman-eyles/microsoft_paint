import React from 'react'
import Header from './Header'

function Tools({ handleUtensil }) {
  return (
    <div
      style={{
        backgroundColor: 'lightgray',
        padding: '5px',
        width: '120px',
        textAlign: 'center',
      }}
    >
      <button
        name="brush"
        onClick={(event) => handleUtensil(event.target.name, "tool")}
      >
        🖌️
      </button>
      <button
        name="background"
        onClick={(event) => handleUtensil(event.target.name, "tool")}
      >
        🖼️
      </button>
      <button
        name="eraser"
        onClick={(event) => handleUtensil(event.target.name, "tool")}
      >
        🧼
      </button>
    </div>
  )
}
export default Tools
