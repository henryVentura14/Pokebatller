import React, { useState } from "react";
import { usePokeContext } from "../context/PokeContext";
import PokeCard from "./PokeCard";
import PokeDialog from "./PokeDialog";
import { PokeData } from "../types/Pokedata";

const PokemonList: React.FC = () => {
  const { pokemonData, loading, error } = usePokeContext();
  const [detailsPokemon, setDetailsPokemon] = useState<PokeData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePokemonClick = (pokemon: any) => {
    setIsOpen(true);
    fetchPokeDetails(pokemon.url).then((data) => {
      setDetailsPokemon(data);
    });
  };

  const fetchPokeDetails = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  if (!pokemonData) {
    return null;
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Pokémon List</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {pokemonData.map((pokemon: any, index: number) => (
            <PokeCard key={index} pokemon={pokemon} onClick={() => handlePokemonClick(pokemon)} />
          ))}
        </div>
      </div>
      {detailsPokemon && (
        <PokeDialog pokemon={detailsPokemon} onClose={() => setDetailsPokemon(null)} isOpen={isOpen} />
      )}
    </div>
  );
};

export default PokemonList;
