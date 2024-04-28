import React from 'react';
import './App.css';
import PokemonList from './components/PokeList';

const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <PokemonList />
      </main>
    </div>
  );
};

export default App;
