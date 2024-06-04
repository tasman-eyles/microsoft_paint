import React, { useState, useEffect } from 'react'
import html2canvas from 'html2canvas'

function Container({ utensil }) {
  const { tool, weight, color } = utensil
  const [magic, setMagic] = useState({
    width: '790px',
    height: '640px',
    backgroundColor: 'white',
    border: '5px solid rgb(207, 207, 207)',
    borderStyle: 'groove',
  })

  const [draw, SetDraw] = useState(false)
  const [lineSegments, setLineSegments] = useState([])
  const [currentColor, setCurrentColor] = useState('black')
  const [thickness, setThickness] = useState(2)

  useEffect(() => {
    const canvas = document.getElementById('canvas')
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      handleWeight(weight)
    }
  }, [weight])

  function takeScreenshot() {
    const canvas = document.getElementById('canvas')
    html2canvas(canvas).then((canvas) => {
      const link = document.createElement('a')
      link.download = 'screenshot.png'
      link.href = canvas.toDataURL()
      link.click()
    })
  }

  function handleBackground() {
    if (tool === 'background') {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = color
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  function handleWeight(weight) {
    if (weight !== undefined && weight !== null) {
      if (weight === 'thin') {
        setThickness(2)
      } else if (weight === 'normal') {
        setThickness(5)
      } else if (weight === 'thick') {
        setThickness(10)
      } else if (weight === 'thicker') {
        setThickness(16)
      } else if (weight === 'thickest') {
        setThickness(30)
      }
    }
  }

  function handleMouseDown(event) {
    if (tool !== 'background') {
      SetDraw(true)
    } else {
      SetDraw(false)
    }
  }
  function handleMouseMove(event) {
    if (draw) {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const newLineSegment = {
        color: currentColor,
        x1: x,
        y1: y,
        x2: x,
        y2: y,
      }

      setLineSegments((prevLineSegments) => [
        ...prevLineSegments,
        newLineSegment,
      ])
      ctx.strokeStyle = color
      ctx.lineWidth = thickness
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(newLineSegment.x1, newLineSegment.y1)
      ctx.lineTo(newLineSegment.x2, newLineSegment.y2)
      ctx.stroke()
    }
  }

  // add screenshot to new component file Screenshot.js

  // add screenshot to header component

  // add background to new component file Background.js

  // add weight to new component file Weight.js

  // let background changeing not effect lines drawn

  // add a color wheel as a new component

  // add a rainbow brush

  return (
    <div style={magic}>
      <canvas
        id="canvas"
        width={magic.width}
        height={magic.height}
        onMouseDown={handleMouseDown}
        onMouseUp={() => SetDraw(false)}
        onClick={handleBackground}
        onMouseMove={handleMouseMove}
      ></canvas>
      <button onClick={takeScreenshot}>Screenshot Your Artwork</button>
    </div>
  )
}
export default Container
