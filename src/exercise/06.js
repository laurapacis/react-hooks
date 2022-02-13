// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView,} from '../pokemon'

function PokemonInfo({pokemonName}) {
    const [status, setStatus] = React.useState('idle')
    const [pokemon, setPokemon] = React.useState(null) // before calling `fetchPokemon`, clear the current pokemon state by setting it to null. (This is to enable the loading state when switching between different pokemon.)
    const [error, setError] = React.useState(null)

    React.useEffect(() => { // use React.useEffect where the callback should be called whenever the pokemon name changes.
        if (!pokemonName) {
            return // if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
        }
        setStatus('pending')
     
        fetchPokemon(pokemonName)
        .then(pokemon => {
            setPokemon(pokemon)
            setStatus('resolved')
        })
        .catch(error => {
            setError(error)
            setStatus('rejected')
        })
    },[pokemonName])
    

    if (status === 'idle') {
        return 'Submit a pokemon'
    } else if (status === 'pending') {
        return <PokemonInfoFallback name={pokemonName} />
    } else if (status === 'rejected') {
        return (
            <div role="alert">
            There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
            </div>
        )
    } else if (status === 'resolved') {
        return <PokemonDataView pokemon={pokemon} />
    }

    throw new Error ('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState(null)

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
