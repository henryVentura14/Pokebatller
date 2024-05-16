import React, { useState, useEffect } from 'react';
import { usePokeContext } from "../context/PokeContext";
import PokeCard from "./PokeCard";
import PokeDialog from "./PokeDialog";
import { PokeData } from "../types/Pokedata";

// Componente para el diálogo de inicio de batalla
const BattleStartDialog: React.FC<{ selectedPokemon: PokeData[]; onCancel: () => void; onBattleStart: () => void; }> = ({ selectedPokemon, onCancel, onBattleStart }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-8 rounded-md">
      <h2 className="text-lg font-semibold mb-4">¡Preparados para la batalla!</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {selectedPokemon.map((pokemon, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20 mb-2" />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-4" onClick={onCancel}>Cancelar</button>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md" onClick={onBattleStart}>Iniciar Batalla</button>
      </div>
    </div>
  </div>
);

const PokemonList: React.FC = () => {
  const { pokemonData, loading, error } = usePokeContext();
  const [detailsPokemon, setDetailsPokemon] = useState<PokeData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokeData[]>([]);
  const [showBattleDialog, setShowBattleDialog] = useState<boolean>(false);

  useEffect(() => {
    if (selectedPokemon.length === 3) {
      setShowBattleDialog(true);
	  setIsOpen(false);
    } else {
      setShowBattleDialog(false);
    }
  }, [selectedPokemon]);

  const togglePokemonSelection = (pokemon: PokeData) => {
    const isSelected = selectedPokemon.find((selected) => selected.name === pokemon.name);
    if (isSelected) {
      setSelectedPokemon(selectedPokemon.filter((selected) => selected.name !== pokemon.name));
    } else {
      setSelectedPokemon([...selectedPokemon, pokemon]);
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
    console.log("Iniciar batalla con:", selectedPokemon);
    // Aquí puedes agregar la lógica para iniciar la batalla
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
        <PokeDialog
          pokemon={detailsPokemon}
          onClose={() => setDetailsPokemon(null)}
          isOpen={isOpen}
          onSelect={() => togglePokemonSelection(detailsPokemon)}
          isSelected={selectedPokemon.some((selected) => selected.name === detailsPokemon.name)}
        />
      )}
      {showBattleDialog && (
        <BattleStartDialog
          selectedPokemon={selectedPokemon}
          onCancel={handleCancelBattle}
          onBattleStart={handleStartBattle}
        />
      )}
    </div>
  );
};

export default PokemonList;
