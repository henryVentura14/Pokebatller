import React, { useEffect, useRef } from "react";
import { PokeData } from "../types/Pokedata";
import { X } from "react-feather";

interface PokeDetailsProps {
  pokemon: PokeData | null;
  isOpen: boolean;
  isSelected: boolean;
  isReady: boolean;
  onClose: () => void;
  onSelect: () => void;
}

const PokeDetailsDialog: React.FC<PokeDetailsProps> = ({
  isOpen,
  pokemon,
  onClose,
  onSelect,
  isSelected,
  isReady,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const showButtonSelect = !isReady || isSelected;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapePress);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [isOpen, onClose]);

  if (!pokemon || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-50">
      <div
        ref={dialogRef}
        className="relative w-full max-w-xl p-4 md:p-8 bg-white rounded-lg"
      >
        <span
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        >
          <X />
        </span>
        <div className="mb-4 flex justify-center">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 overflow-hidden rounded-md">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 capitalize">{pokemon.name}</h2>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Abilities:</h3>
          <ul className="list-disc list-inside">
            {pokemon.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Types:</h3>
          <ul className="list-disc list-inside">
            {pokemon.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Stats:</h3>
          <ul>
            {pokemon.stats.map((stat, index) => (
              <li key={index}>
                <span className="font-semibold">{stat.stat.name}: </span>
                {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-between">
          {showButtonSelect && (
            <button
              type="button"
              className={`py-2 px-4 font-bold text-white rounded ${
                isSelected
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={onSelect}
            >
              {isSelected ? "Deselect" : "Select"}
            </button>
          )}
          <button
            type="button"
            className="py-2 px-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokeDetailsDialog;
