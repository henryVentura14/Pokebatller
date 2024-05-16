import React from "react";
import { PokeData } from "../types/Pokedata";
import { CheckCircle } from "react-feather";

interface PokeCardProps {
  pokemon: PokeData;
  isSelected: boolean;
  onSelect: () => void;
  onOpenDialog: () => void;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon, onSelect, isSelected, onOpenDialog }) => {
  const getIndexFromUrl = (url: string): string => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const sprite = pokemon.url
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIndexFromUrl(pokemon.url)}.png`
    : pokemon.sprites.front_default;

  return (

    <div className="group relative">
      <div
        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
        onClick={onOpenDialog}
      >
          <div className={`${isSelected ? 'absolute' : 'hidden'}`}>
            <CheckCircle color="green"/>
          </div>
        <img
          src={sprite}
          alt={pokemon.name}
          className="w-full h-full object-center object-cover group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 capitalize">{pokemon.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
