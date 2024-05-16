import React from "react";
import { PokeData } from "../types/Pokedata";

interface PokeDialogProps {
  pokemon: PokeData | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: () => void;
  isSelected: boolean;
}

const PokeDialog: React.FC<PokeDialogProps> = ({ isOpen, pokemon, onClose, onSelect, isSelected }) => {
  if (!pokemon || !isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-xl">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-full h-full object-center object-cover group-hover:opacity-75"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 capitalize">{pokemon.name}</h2>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Abilities:</h3>
          <ul className="list-disc list-inside">
            {pokemon.abilities.map((ability: any, index: number) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Types:</h3>
          <ul className="list-disc list-inside">
            {pokemon.types.map((type: any, index: number) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Stats:</h3>
          <ul>
            {pokemon.stats.map((stat: any, index: number) => (
              <li key={index}>
                <span className="font-semibold">{stat.stat.name}: </span>
                {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-between">
          <button className={` text-white font-bold py-2 px-4 rounded ${isSelected? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`} onClick={onSelect}>
            {isSelected ? 'Deselect' : 'Select'}
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokeDialog;
