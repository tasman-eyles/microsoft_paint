import React, { useRef, useCallback } from 'react'

const WIDTH = 790
const HEIGHT = 640

function Container({ utensil }) {
  // ! 🧑‍🏫
  // we'll keep a reference to the canvas so we can use the DOM methods
  // to directly manipulate it
  //
  // https://react.dev/learn/manipulating-the-dom-with-refs
  /** @type {import('react').Ref<HTMLCanvasElement>} */
  const canvas = useRef()

  // ! 🧑‍🏫
  // we keep a reference to the ImageData so that we can
  // update it frequently without causing react to re-render
  //
  // https://react.dev/learn/referencing-values-with-refs
  /** @type {import('react').Ref<OffscreenCanvas>} */
  const offscreenCanvas = useRef(new OffscreenCanvas(WIDTH, HEIGHT))

  /** @type {import('react').Ref<{ x: number, y: number }>} */
  const previousCoordinates = useRef()

  // ! 🧑‍🏫
  // I'm wrapping our functions in `useCallback` to prevent re-renders
  // for functions that use only refs, this should mean that they
  // never cause a re-render.
  //
  // It also means that eslint will warn me if I'm using any state
  // that I'm not explicitly declaring
  const updateCanvas = useCallback(() => {
    if (!canvas.current || !offscreenCanvas.current) {
      return
    }

    const ctx = canvas.current.getContext('2d')
    ctx.drawImage(offscreenCanvas.current, 0, 0)
  }, [])

  // ! 🧑‍🏫
  // I removed a useEffect here that was copying props into state.
  // https://react.dev/learn/you-might-not-need-an-effect

  // ! 🧑‍🏫
  // there was also some state you just weren't setting, so I deleted them

  const { tool, weight, color } = utensil
  const magic = {
    width: '790px',
    height: '640px',
    backgroundColor: 'white',
    border: '5px solid rgb(207, 207, 207)',
    borderStyle: 'groove',
  }

  const thickness = weightToThickness(weight)

  const takeScreenshot = useCallback(async () => {
    if (!offscreenCanvas.current) {
      return
    }
    // ! 🧑‍🏫
    // We don't need html2canvas here, we can use convertToBlob on the offscreen canvas
    //
    // https://caniuse.com/?search=convertToBlob
    const blob = await offscreenCanvas.current.convertToBlob()
    const link = document.createElement('a')
    link.download = 'screenshot.png'
    link.href = URL.createObjectURL(blob)
    link.click()
  }, [])

  const handleBackground = useCallback(() => {
    if (tool === 'background') {
      const ctx = offscreenCanvas.current.getContext('2d')
      ctx.fillStyle = color
      ctx.fillRect(0, 0, WIDTH, HEIGHT)
      updateCanvas()
    }
  }, [tool, color, updateCanvas])

  const handleMouseMove = useCallback(
    (event) => {
      const isMouseDown = !!(event.nativeEvent.buttons & 1)
      if (!isMouseDown || tool === 'background') {
        previousCoordinates.current = undefined
        return
      }

      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetX
      const x = event.nativeEvent.offsetX
      const y = event.nativeEvent.offsetY

      // ! 🧑‍🏫
      // we always want to be drawing a line between two points
      // so if there is no previous coordinates, we set these as the previous
      // and exit
      //
      // TODO: if we make this an array of previous points we could draw a curve instead
      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo
      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arcTo
      if (!previousCoordinates.current) {
        previousCoordinates.current = { x, y }
        return
      }

      // ! 🧑‍🏫
      // an offscreen canvas enables us to use the Canvas API without
      // affecting the live DOM
      // https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
      const ctx = offscreenCanvas.current.getContext('2d')

      const newLineSegment = {
        color,
        x1: previousCoordinates.current.x,
        y1: previousCoordinates.current.y,
        x2: x,
        y2: y,
      }

      ctx.strokeStyle = color
      ctx.lineWidth = thickness
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(newLineSegment.x1, newLineSegment.y1)
      ctx.lineTo(newLineSegment.x2, newLineSegment.y2)
      ctx.stroke()
      previousCoordinates.current = { x, y }
      updateCanvas()
    },
    [color, thickness, tool, updateCanvas]
  )


  // add screenshot to new component file Screenshot.js

  // add screenshot to header component to display next to colors

  // add background to new component file Background.js

  // add weight to new component file Weight.js

  // let background changeing not effect lines drawn

  // make eraser have the color value of the selected background color, not white

  // add a color wheel as a new component

  // add a rainbow brush

  // add login

  // stretch concept pitch:

  // 1v1 competitive paint drawing

  // you get a prompt of something to draw

  // you each draw it (with a time limit)

  // store those images server side

  // have voting open for say a week

// winner winner chicken dinner
  

  return (
    <div style={magic}>
      <canvas
        id="canvas"
        ref={canvas}
        width={WIDTH}
        height={HEIGHT}
        onClick={handleBackground}
        onMouseMove={handleMouseMove}
      ></canvas>
      <button onClick={takeScreenshot}>Screenshot Your Artwork</button>
    </div>
  )
}

/**
 *
 * @param {number} weight
 * @returns {string}
 */
function weightToThickness(weight) {
  if (weight === 'thin') {
    return 2
  }

  if (weight === 'normal') {
    return 5
  }

  if (weight === 'thick') {
    return 10
  }

  if (weight === 'thicker') {
    return 16
  }

  if (weight === "thickest") {
    return 30
  }
  
  return 2
}

export default Container
