import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListeReservation from "./ListeReservation";
import logoChambre from "../../logo/chambreDouble.jpeg";
import logoChambre2 from "../../logo/chambreKing.jpeg";
import "./../../Style/reservationStyle.css";

const DashboardWithReservations = () => {
  const navigate = useNavigate();

  // State for reservations
  const [reservations, setReservations] = useState([]);
  const [reservationsDisponible, setReservationsDisponible] = useState([]);

  // Retrieve and parse the user from sessionStorage
  const user = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("user"));
    } catch (error) {
      console.error("Failed to parse user data:", error);
      return null;
    }
  })();

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to login if no user is logged in
    }
  }, [user, navigate]);

  // Handle disconnect logic
  const handleDisconnect = () => {
    sessionStorage.removeItem("user"); // Clear user data
    navigate("/"); // Redirect to login page
  };

  // Mock functions for fetching and clearing reservations
  const rechercheReservations = () => {
    setReservations(mockReservations);
    setReservationsDisponible(mockReservationsDisponible);
  };

  const effacerReservations = () => {
    setReservations([]);
    setReservationsDisponible([]);
  };

  if (!user) return null; // Prevent rendering while redirecting

  return (
    <>
<header className="header">
  <img
    src={require("../../logo/hotel_logo.png")}
    alt="Hotel Logo"
    className="header-logo"
  />
  <span>Welcome, {user.client?.prenom || "User"}!</span>
  <button onClick={handleDisconnect} className="header-button">
    Déconnexion
  </button>

</header>
<main>
  <section className="dashboard-container">
    <h1>Dashboard</h1>
    <p>Email: {user.client?.courriel || "N/A"}</p>
    <div className="button-container">
      <button onClick={rechercheReservations} className="button-info">
        Afficher les Réservations
      </button>
      <button className="button-blue">Ajouter une Réservations</button>
      <button onClick={effacerReservations} className="button-danger">
        Effacer une Réservations
      </button>
    </div>
  </section>

  <section className="reservation-container">
    

    <div className="tables-container">
      {reservations.length > 0 && (
        <ListeReservation
          title="Liste des Réservations"
          reservations={reservations}
        />
      )}
      {reservationsDisponible.length > 0 && (
        <ListeReservation
          title="Liste des Réservations Disponibles"
          reservations={reservationsDisponible}
        />
      )}
    </div>
  </section>
</main>


    </>
  );
};

export default DashboardWithReservations;

/* Mock Data */
const mockReservations = [
  {
    du: "15 décembre 2024",
    au: "24 décembre 2024",
    prix: "129.99",
    client: {
      prenom: "Jean",
      nom: "Saisrien",
      adresse: "1234 rue Des Tulipes, Gaspé",
      mobile: "418-123-4567",
    },
    chambre: {
      numero: "14",
      logo: logoChambre,
    },
  },
  {
    du: "25 décembre 2024",
    au: "31 décembre 2024",
    prix: "159.99",
    client: {
      prenom: "Paul",
      nom: "Therrien",
      adresse: "6789 rue Des Érables, Matane",
      mobile: "418-456-1234",
    },
    chambre: {
      numero: "324",
      logo: logoChambre2,
    },
  },
];

const mockReservationsDisponible = [
  {
    du: "15 décembre 2024",
    au: "24 décembre 2024",
    prix: "129.99",
    client: {
      prenom: "Jean",
      nom: "Saisrien",
      adresse: "1234 rue Des Tulipes, Gaspé",
      mobile: "418-123-4567",
    },
    chambre: {
      numero: "14",
      logo: logoChambre,
    },
  },
  {
    du: "25 décembre 2024",
    au: "31 décembre 2024",
    prix: "159.99",
    client: {
      prenom: "Paul",
      nom: "Therrien",
      adresse: "6789 rue Des Érables, Matane",
      mobile: "418-456-1234",
    },
    chambre: {
      numero: "324",
      logo: logoChambre2,
    },
  },
];
