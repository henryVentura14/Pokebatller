import React from "react";
import { PokeData } from "../types/Pokedata";

interface PokeBoxProps {
  selectedPokemon: PokeData[];
  onRemove: (pokemon: PokeData) => void;
}

const PokeBox: React.FC<PokeBoxProps> = ({ selectedPokemon, onRemove }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
      <h3 className="text-xl font-bold mb-4">Selected Pokémon</h3>
      <div className="flex space-x-4">
        {selectedPokemon.map((pokemon) => (
          <div key={pokemon.name} className="relative">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20 object-cover rounded-lg" />
            <button
              onClick={() => onRemove(pokemon)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokeBox;
