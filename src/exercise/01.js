// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName}) {
// let array = React.useState('');
// let name = array[0];
// let setName = array[1];
const [name, setName] = React.useState(initialName, ' ');

  function handleChange(event) {
    // console.log(event.target.value);

    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} value={name} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName='lurial' />
}

export default App
