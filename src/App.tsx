import React from 'react';
import './App.css';
import PokemonList from './components/PokeList';
import PokeNavbar from './components/PokeNavbar';

const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <PokeNavbar />
        <PokemonList />
      </main>
    </div>
  );
};

export default App;
