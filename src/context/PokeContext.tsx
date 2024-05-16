// PokeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PokeContextType, PokeData } from '../types/Pokedata';
import axios from 'axios';

interface PokeProviderProps {
    children: React.ReactNode;
}

const PokeContext = createContext<PokeContextType>({
    pokemonData: null,
    selectedPokemon: [],
    loading: false,
    error: null,
    searchPokemon: () => {},
    addSelectedPokemon: () => {},
    removeSelectedPokemon: () => {},
});

export const usePokeContext = () => useContext(PokeContext);

export const PokeProvider: React.FC<PokeProviderProps> = ({ children }) => {
    const [pokemonData, setPokemonData] = useState<PokeData[] | null>(null);
    const [filteredData, setFilteredData] = useState<PokeData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPokemon, setSelectedPokemon] = useState<PokeData[]>([]);

    useEffect(() => {
        const fetchPokemonData = async () => {
            setLoading(true);
            try {
                const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
                setPokemonData(res.data.results);
                setFilteredData(res.data.results);
            } catch (error: any) {
                setError(error.message);
            }
            setLoading(false);
        };

        fetchPokemonData();
    }, []);

    const searchPokemon = (query: string) => {
        if (!query) {
            setFilteredData(pokemonData);
            return;
        }
        const filtered = pokemonData?.filter((pokemon) => pokemon.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredData(filtered || []);
    };

    const addSelectedPokemon = (pokemon: PokeData) => {
        setSelectedPokemon(prevSelectedPokemon => [...prevSelectedPokemon, pokemon]);
    };

    const removeSelectedPokemon = (pokemon: PokeData) => {
        setSelectedPokemon(prevSelectedPokemon => prevSelectedPokemon.filter(p => p.name !== pokemon.name));
    };

    return (
        <PokeContext.Provider value={{ 
            pokemonData: filteredData, 
            selectedPokemon, 
            loading, 
            error, 
            searchPokemon, 
            addSelectedPokemon, 
            removeSelectedPokemon 
        }}>
            {children}
        </PokeContext.Provider>
    );
};

export default PokeContext;
