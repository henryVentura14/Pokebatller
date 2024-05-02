import React, { createContext, useContext, useState, useEffect } from 'react';
import { PokeContextType, PokeData } from '../types/Pokedata';
import axios from 'axios';

const PokeContext = createContext<PokeContextType>({
    pokemonData: null,
    loading: false,
    error: null,
    searchPokemon: () => {},
});

export const usePokeContext = () => useContext(PokeContext);

export const PokeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [pokemonData, setPokemonData] = useState<PokeData[] | null>(null);
    const [filteredData, setFilteredData] = useState<PokeData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <PokeContext.Provider value={{ pokemonData: filteredData, loading, error, searchPokemon }}>
            {children}
        </PokeContext.Provider>
    );
};

export default PokeContext;
