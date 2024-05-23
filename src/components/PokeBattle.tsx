import React, { useState, useEffect } from "react";
import { usePokeContext } from "../context/PokeContext";
import { PokeData } from "../types/Pokedata";

const PokeBattle: React.FC = () => {
  const { selectedPokemon } = usePokeContext();
  const [opponentPokemon, setOpponentPokemon] = useState<PokeData[]>([]);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      const randomPokemon: PokeData[] = [];
      for (let i = 0; i < 3; i++) {
        const id = Math.floor(Math.random() * 100) + 1;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        randomPokemon.push(data);
      }
      setOpponentPokemon(randomPokemon);
    };

    fetchRandomPokemon();
  }, []);

  const calculateWinner = () => {
    const totalStats = (pokemonList: PokeData[]) =>
      pokemonList.reduce(
        (sum, pokemon) => sum + pokemon.stats.reduce((statSum, stat) => statSum + stat.base_stat, 0),
        0
      );

    const playerStats = totalStats(selectedPokemon);
    const opponentStats = totalStats(opponentPokemon);

    return playerStats > opponentStats ? "Jugador" : "Oponente";
  };

  if (!selectedPokemon.length || !opponentPokemon.length) {
    return <div className="text-center mt-8">Cargando Pokémon para la batalla...</div>;
  }

  return (
    <div className="bg-white py-16 sm:py-24 mt-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">¡Batalla Pokémon!</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 xl:gap-x-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Tus Pokémon</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedPokemon.map((pokemon, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20 mb-2" />
                  <p className="capitalize">{pokemon.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Pokémon del Oponente</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {opponentPokemon.map((pokemon, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20 mb-2" />
                  <p className="capitalize">{pokemon.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold">Ganador: {calculateWinner()}</h3>
        </div>
      </div>
    </div>
  );
};

export default PokeBattle;
