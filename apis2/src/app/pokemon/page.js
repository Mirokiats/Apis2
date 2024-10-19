'use client';

import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  const fetchPokemon = async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon no encontrado');
      }
      const data = await response.json();
      setPokemon(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPokemon(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      fetchPokemon(search);
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Buscar Pokémon</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nombre del Pokémon"/>
        <button type="submit">Buscar</button>
      </form>
      {error ? (<p>{error}</p>) : pokemon ? (
        <div>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ) : (<p>Busca un Pokémon por su nombre.</p>)
      }
    </div>
  );
};

export default Pokemon;
