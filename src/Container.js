import React, { useState, useEffect } from 'react'

function Container({ utensil }) {
  const { tool, weight, color } = utensil
  const [magic, setMagic] = useState({
    width: '790px',
    height: '600px',
    backgroundColor: 'white',
    border: '5px solid rgb(207, 207, 207)',
    borderStyle: 'groove',
  })

  const [draw, SetDraw] = useState(false)

  useEffect(() => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
  }, [])

  function handleBucket() {
    if (tool === 'bucket') {
      const newItem = {
        ...magic,
        backgroundColor: color,
      }
      setMagic(newItem)
    }
  }

  // finish bucket functionality (need brush done first)

  // change color of brush reletive to what is selected

  let previousPosition = null

  function handleMouseDown(event) {
    previousPosition = { x: event.clientX, y: event.clientY }
    SetDraw(true)
  }

  function handleMouseMove(event) {
    if (draw) {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      function handleColor() {
        ctx.strokeStyle = color
      }

      if (previousPosition) {
        ctx.moveTo(previousPosition.x, previousPosition.y)
        ctx.lineTo(x, y)
        ctx.stroke()
        handleColor()
      }

      previousPosition = { x, y }
    } else {
    }
  }

  // write eraser functionality (same as brush, but color
  // painted is the background color to give the eraser ilusion)

  // function handleMousemove(event) {
  //   if (tool === 'brush' && draw === true) {
  //     console.log(event.screenX, event.screenY)
  //   }
  // }

  return (
    <div style={magic}>
      <canvas
        id="canvas"
        width={magic.width}
        height={magic.height}
        onMouseDown={handleMouseDown}
        onMouseUp={() => SetDraw(false)}
        onClick={handleBucket}
        onMouseMove={handleMouseMove}
      ></canvas>
    </div>
  )
}
export default Container
