import React, { useState } from 'react';
import { usePokemonContext } from '../context/PokeContext';
import PokeCard from './PokeCard';
import PokeDialog from './PokeDialog';

const PokemonList: React.FC = () => {
    const { pokemonData, loading, error } = usePokemonContext();
    const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const handlePokemonClick = (pokemon: any) => {
        setIsOpen(true);
        setSelectedPokemon(pokemon);
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
            {selectedPokemon && <PokeDialog pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} isOpen={isOpen} />}
        </div>
    );
};

export default PokemonList;
