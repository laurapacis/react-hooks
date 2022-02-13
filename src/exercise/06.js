// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView,} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null) // before calling `fetchPokemon`, clear the current pokemon state by setting it to null. (This is to enable the loading state when switching between different pokemon.)
  const [error, setError] = React.useState(null)

  React.useEffect(() => { // use React.useEffect where the callback should be called whenever the pokemon name changes.
    if (!pokemonName) {
        return // if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
    }
    setPokemon(null) // to show that loading state
    fetchPokemon(pokemonName)
    .then(pokemon => setPokemon(pokemon))
    .catch(error => setError(error))
  },[pokemonName])
 
if (error) {
    return (
    <div role="alert">
     There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
    )
}
if (!pokemonName) {
    return 'Submit a pokemon'
} else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
} else {
    return <PokemonDataView pokemon={pokemon} />
}
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
