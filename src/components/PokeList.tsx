import React, { useState, useEffect } from "react";
import { usePokeContext } from "../context/PokeContext";
import { PokeData } from "../types/Pokedata";
import { useNavigate } from "react-router-dom";

import PokeCard from "./PokeCard";
import PokeDetailsDialog from "./PokeDetailsDialog";
import PokeBattleDialog from "./PokeBattleDialog";
import PokeBox from "./PokeBox";

const PokemonList: React.FC = () => {
  const navigate = useNavigate();

  const {
    pokemonData,
    loading,
    error,
    selectedPokemon,
    addSelectedPokemon,
    removeSelectedPokemon,
    generateRandomList,
    clearSelectedPokemon,
  } = usePokeContext();
  const [detailsPokemon, setDetailsPokemon] = useState<PokeData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showBattleDialog, setShowBattleDialog] = useState<boolean>(false);

  useEffect(() => {
    if (selectedPokemon.length === 3) {
      setIsOpen(false);
      setShowBattleDialog(true);
    } else {
      setShowBattleDialog(false);
    }
  }, [selectedPokemon]);

  const togglePokemonSelection = (pokemon: PokeData) => {
    const isSelected = selectedPokemon.find((selected) => selected.name === pokemon.name);
    if (isSelected) {
      removeSelectedPokemon(pokemon);
    } else if (selectedPokemon.length < 3) {
      addSelectedPokemon(pokemon);
    }
  };

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

  const handleCancelBattle = () => {
    setShowBattleDialog(false);
  };

  const handleStartBattle = () => {
    navigate("/battle");
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
    <div className="bg-white py-16 sm:py-24 mt-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <header className="flex flex-col lg:flex-row items-center justify-between mb-4 sm:h-48">
          <div className="mb-4 lg:mb-0">
            {selectedPokemon.length > 0 && (
              <PokeBox selectedPokemon={selectedPokemon} onRemove={removeSelectedPokemon} />
            )}
          </div>
          <div className="flex flex-col lg:flex-row  lg:space-x-4">
            <button
              type="button"
              onClick={generateRandomList}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Random List
            </button>
            {selectedPokemon.length >= 1 && (
              <button
                type="button"
                onClick={clearSelectedPokemon}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2.5"
              >
                Clear Selection
              </button>
            )}
            {selectedPokemon.length === 3 && (
              <button
                type="button"
                onClick={() => handleStartBattle()}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded sm:hidden mt-2"
              >
                Go to Battle
              </button>
            )}
          </div>
        </header>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Pokémon List</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {pokemonData.map((pokemon: PokeData, index: number) => (
            <PokeCard
              key={index}
              pokemon={pokemon}
              onSelect={() => togglePokemonSelection(pokemon)}
              isSelected={selectedPokemon.some((selected) => selected.name === pokemon.name)}
              onOpenDialog={() => handlePokemonClick(pokemon)}
            />
          ))}
        </div>
      </div>
      {detailsPokemon && (
        <PokeDetailsDialog
          pokemon={detailsPokemon}
          onClose={() => setDetailsPokemon(null)}
          isOpen={isOpen}
          onSelect={() => togglePokemonSelection(detailsPokemon)}
          isReady={selectedPokemon.length === 3}
          isSelected={selectedPokemon.some((selected) => selected.name === detailsPokemon.name)}
        />
      )}
      {showBattleDialog && (
        <PokeBattleDialog
          selectedPokemon={selectedPokemon}
          onCancel={handleCancelBattle}
          onBattleStart={handleStartBattle}
        />
      )}
    </div>
  );
};

export default PokemonList;
