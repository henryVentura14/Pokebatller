import React from "react";
import { PokeData } from "../types/Pokedata";

interface PokeBattleDialogProps {
  selectedPokemon: PokeData[];
  onCancel: () => void;
  onBattleStart: () => void;
}

export default function PokeBattleDialog({ selectedPokemon, onCancel, onBattleStart }: PokeBattleDialogProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md shadow-md w-11/12 max-w-lg">
        <h2 className="text-xl font-bold mb-4">¡Preparados para la batalla!</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {selectedPokemon.map((pokemon, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20 mb-2" />
              <p className="capitalize">{pokemon.name}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={onBattleStart}
          >
            Iniciar Batalla
          </button>
        </div>
      </div>
    </div>
  );
}
