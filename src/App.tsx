import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import './App.css';
import PokeList from './components/PokeList';
import PokeNavbar from './components/PokeNavbar';
import PokeBattle from './components/PokeBattle';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <PokeNavbar />
        <Routes>
          <Route path="/" element={<PokeList />} />
          <Route path="/battle" element={<PokeBattle />} /> 
        </Routes>
      </Router>
    </div>
  );
};

export default App;
