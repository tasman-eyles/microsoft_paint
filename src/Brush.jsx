import React from 'react'

function Brush({ handleUtensil }) {
  return (
    <>
      <select
        onChange={(event) => handleUtensil(event.target.value, 'weight')}
        id="brush-detail"
      >
        <option>Thin</option>
        <option>Normal</option>
        <option>Thick</option>
        <option>Thicker</option>
        <option>Thickest</option>
      </select>
    </>
  )
}

export default Brush
