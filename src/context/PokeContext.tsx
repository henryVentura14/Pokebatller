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
    generateRandomList: () => {},
    clearSelectedPokemon: () => {},
});

export const usePokeContext = () => useContext(PokeContext);

const getRandomElements = (arr: PokeData[], count: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const PokeProvider: React.FC<PokeProviderProps> = ({ children }) => {
    const [pokemonData, setPokemonData] = useState<PokeData[] | null>(null);
    const [filteredData, setFilteredData] = useState<PokeData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPokemon, setSelectedPokemon] = useState<PokeData[]>(() => {
        const saved = localStorage.getItem('selectedPokemon');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const fetchPokemonData = async () => {
            setLoading(true);
            try {
                const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0');
                setPokemonData(res.data.results);
                setFilteredData(res.data.results);
            } catch (error: any) {
                setError(error.message);
            }
            setLoading(false);
        };

        fetchPokemonData();
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon));
    }, [selectedPokemon]);

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

    const generateRandomList = () => {
        if (pokemonData) {
            setFilteredData(getRandomElements(pokemonData, 50)); // Número de Pokémon aleatorios
        }
    };

    
    const clearSelectedPokemon = () => {
        setSelectedPokemon([]);
    };

    return (
        <PokeContext.Provider value={{ 
            pokemonData: filteredData, 
            selectedPokemon, 
            loading, 
            error, 
            searchPokemon, 
            addSelectedPokemon, 
            removeSelectedPokemon, 
            generateRandomList,
            clearSelectedPokemon
        }}>
            {children}
        </PokeContext.Provider>
    );
};

export default PokeContext;
