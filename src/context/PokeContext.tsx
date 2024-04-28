// PokeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface PokeContextType {
    pokemonData: any[] | null;
    loading: boolean;
    error: string | null;
}

const PokeContext = createContext<PokeContextType>({
    pokemonData: null,
    loading: false,
    error: null,
});

export const usePokemonContext = () => useContext(PokeContext);

export const PokeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [pokemonData, setPokemonData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
                setPokemonData(response.data.results);
            } catch (error: any) {
                setError(error.message);
            }
            setLoading(false);
        };

        fetchPokemonData();
    }, []);

    return (
        <PokeContext.Provider value={{ pokemonData, loading, error }}>
            {children}
        </PokeContext.Provider>
    );
};

export default PokeContext;
