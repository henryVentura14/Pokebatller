import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PokeProvider } from './context/PokeContext';

ReactDOM.render(
  <React.StrictMode>
    <PokeProvider>
      <App />
    </PokeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
