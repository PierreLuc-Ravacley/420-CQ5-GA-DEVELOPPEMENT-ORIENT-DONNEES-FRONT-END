import React, { useState } from 'react';
import './Style/App.css';
import RechercheReservation from "./components/Reservation/RechercheReservation";
import RechercheClient from "./components/Client/RechercheClient";

function App() {
  const [showReservation, setShowReservation] = useState(false); // State for RechercheReservation
  const [showClient, setShowClient] = useState(false); // State for RechercheClient

  const toggleRechercheReservation = () => {
    setShowReservation((prev) => !prev); // Toggle RechercheReservation
    setShowClient(false); // Hide RechercheClient
  };

  const toggleRechercheClient = () => {
    setShowClient((prev) => !prev); // Toggle RechercheClient
    setShowReservation(false); // Hide RechercheReservation
  };

  return (
    <>
      <button onClick={toggleRechercheReservation}>
        {showReservation ? 'Masquer Recherche Réservation' : 'Afficher Recherche Réservation'}
      </button>
      <button onClick={toggleRechercheClient}>
        {showClient ? 'Masquer Recherche Client' : 'Afficher Recherche Client'}
      </button>

      {showReservation && <RechercheReservation />}
      {showClient && <RechercheClient />}
    </>
  );
}

export default App;
