import React, { useState, useEffect } from "react";
import { usePokeContext } from "../context/PokeContext";
import { PokeData } from "../types/Pokedata";

const PokeBattle: React.FC = () => {
  const { selectedPokemon } = usePokeContext();
  const [opponentPokemon, setOpponentPokemon] = useState<PokeData[]>([]);

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

  useEffect(() => {
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

    return playerStats > opponentStats ? "Player" : "CPU";
  };

  if (!selectedPokemon.length || !opponentPokemon.length) {
    return <div className="text-center mt-8">Loading Pokémon for the battle...</div>;
  }

  return (
    <div className="bg-white py-16 sm:py-24 mt-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Pokémon Battle!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-x-8 xl:gap-x-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 sm:block hidden">Your Pokémon</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedPokemon.map((pokemon, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20 mb-2" />
                  <p className="capitalize">{pokemon.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img className="h-24 w-24 sm:h-48 sm:w-48" src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWV6MG50c3ppOHRpNm90YXY3NTluNzdnNmhxZnJsNWMwc25jOW9iZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fYwuzOT53K7K4XLIq4/giphy.gif" alt="versus" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 sm:block hidden">Opponent's Pokémon</h3>
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
          <h3 className="text-xl font-semibold">Winner: {calculateWinner()}</h3>
          <button
            onClick={() => {
              fetchRandomPokemon();
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry Battle
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokeBattle;
