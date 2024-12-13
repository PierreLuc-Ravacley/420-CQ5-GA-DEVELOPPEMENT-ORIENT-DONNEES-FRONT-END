import React from 'react';
import './Style/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inscription from "./components/inscription/Inscription";
import Login from "./components/login/Login"; // Importez Login
import RechercheReservation from "./components/rechercheReservation/RechercheReservation"; // Importez RechercheReservation

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="container">
            <Routes>
              <Route path="/" element={<Login  />} />
              <Route path="/inscription" element={<Inscription />} />
              <Route path="/recherche" element={<RechercheReservation />} />
            </Routes>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;