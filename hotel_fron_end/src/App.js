import React from 'react';
import './App.css';
import Inscription from "./components/inscription/Inscription";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>Inscription</h1>
          <Inscription /> {/* Affichage du formulaire d'inscription */}
        </div>
      </header>
    </div>
  );
}

export default App;