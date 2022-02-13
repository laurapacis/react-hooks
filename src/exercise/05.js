// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  const tiltRef = React.useRef()
  React.useEffect(()=> {
    const tiltNode = tiltRef.current
    VanillaTilt.init(tiltNode, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
    })
    return function cleanup() {
        tiltNode.VanillaTilt.destroy() // get rid of all the event handlers and everything else that vanilla-tilt has put on to our tiltNode
    }
},[]) // dependencies array: no need to synchronize the state of the world with the state of the app. It just needs to happen once when we're mounted, and then get cleaned up when were unmounted.

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
