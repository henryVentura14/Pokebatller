// Battle.tsx
import React, { useState, useEffect } from 'react';
import { usePokeContext } from '../context/PokeContext';
import { PokeData } from '../types/Pokedata';

const PokeBattle: React.FC = () => {
    const { selectedPokemon } = usePokeContext();
    const [opponentPokemon, setOpponentPokemon] = useState<PokeData[]>([]);
    const [winner, setWinner] = useState<string | null>(null);
    const [battleInProgress, setBattleInProgress] = useState<boolean>(false);

    useEffect(() => {
        const fetchOpponentPokemon = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=3');
                const data = await response.json();
                const opponents = await Promise.all(
                    data.results.map(async (result: any) => {
                        const res = await fetch(result.url);
                        return res.json();
                    })
                );
                setOpponentPokemon(opponents);
            } catch (error) {
                console.error('Error fetching opponent Pokémon:', error);
            }
        };

        fetchOpponentPokemon();
    }, []);

    const handleBattle = () => {
        setBattleInProgress(true);
        // Inicializar los stats totales de cada equipo
        let userTotalStats = 0;
        let opponentTotalStats = 0;

        // Calcular el total de stats del usuario
        selectedPokemon.forEach((pokemon) => {
            pokemon.stats.forEach((stat) => {
                userTotalStats += stat.base_stat;
            });
        });

        // Calcular el total de stats del oponente
        opponentPokemon.forEach((pokemon) => {
            pokemon.stats.forEach((stat) => {
                opponentTotalStats += stat.base_stat;
            });
        });

        // Determinar el ganador
        if (userTotalStats > opponentTotalStats) {
            setWinner('You');
        } else if (userTotalStats < opponentTotalStats) {
            setWinner('Opponent');
        } else {
            setWinner('Tie');
        }
    };

    return (
        <div>
            <h2>Battle Screen</h2>
            <div>
                <h3>Your Team:</h3>
                {selectedPokemon.map((pokemon, index) => (
                    <div key={index}>
                        <p>{pokemon.name}</p>
                        <ul>
                            {pokemon.stats.map((stat, idx) => (
                                <li key={idx}>{stat.stat.name}: {stat.base_stat}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div>
                <h3>Opponent Team:</h3>
                {opponentPokemon.map((pokemon, index) => (
                    <div key={index}>
                        <p>{pokemon.name}</p>
                        <ul>
                            {pokemon.stats.map((stat, idx) => (
                                <li key={idx}>{stat.stat.name}: {stat.base_stat}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button onClick={handleBattle} disabled={battleInProgress}>
                {battleInProgress ? 'Battle in Progress...' : 'Start Battle'}
            </button>
            {winner && <p>The winner is: {winner}</p>}
        </div>
    );
};

export default PokeBattle;
