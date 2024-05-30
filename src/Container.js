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

  // write brush functionality

  let previousPosition = null

  function handleMouseDown(event) {
    previousPosition = { x: event.clientX, y: event.clientY }
    SetDraw(true)
  }

  function handleMouseMove(event) {
    console.log('Mouse moved!')
    if (draw) {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      console.log('Canvas context:', ctx)
      if (previousPosition) {
        ctx.moveTo(previousPosition.x, previousPosition.y)
        ctx.lineTo(event.clientX, event.clientY)
        ctx.stroke()
      }
      previousPosition = { x: event.clientX, y: event.clientY }
    } else {
      console.log('Draw is false')
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
