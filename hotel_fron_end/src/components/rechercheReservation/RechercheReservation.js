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
  const [newReservation, setNewReservation] = useState({
    fk_id_client: "",
    fk_id_chambre: "",
    dateDebut: "",
    dateFin: "",
    prixParJour: "",
    infoReservation: "",
    chambre: {
      numero_chambre: "",
      disponible_reservation: false,
      autre_informations: "",
      type_chambre: ""
    }
  });
  const [showForm, setShowForm] = useState(false); // État pour contrôler l'affichage du formulaire

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

  // Function to handle adding a new reservation
  const handleAddReservation = () => {
    const newId = reservations.length + 1; // Simple ID generation
    const reservationToAdd = {
      ...newReservation,
      id_reservation: newId,
      client: { prenom: user.client?.prenom || "User " }, // Assuming the client is the logged-in user
    };
    setReservations([...reservations, reservationToAdd]);
    setNewReservation({
      fk_id_client: "",
      fk_id_chambre: "",
      dateDebut: "",
      dateFin: "",
      prixParJour: "",
      infoReservation: "",
      chambre: {
        numero_chambre: "",
        disponible_reservation: false,
        autre_informations: "",
        type_chambre: ""
      }
    }); // Reset form
    setShowForm(false); // Hide form after adding
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReservation((prev) => ({ ...prev, [name]: value }));
  };
  const handleModifierReservation = (reservation) => {
    // Code pour modifier la réservation
    console.log('Modifier la réservation', reservation);
  };

  const handleSupprimerReservation = (reservation) => {
    // Code pour supprimer la réservation
    console.log('Supprimer la réservation', reservation);
  };
  const handleNestedChange = (e, nestedKey) => {
    const { name, value } = e.target;

    if (nestedKey === 'chambre') {
      const chambreKey = name; // Get the key of the chambre object
      setNewReservation((prev) => ({
        ...prev,
        chambre: { ...prev.chambre, [chambreKey]: value }
      }));
    }
  };

  const [idReservation, setIdReservation] = useState("");
  const [reservationTrouvee, setReservationTrouvee] = useState(null);
  
  const rechercherReservation = (id) => {
    // Search for the reservation in the database or in an array of reservations
    const reservation = reservations.find((r) => r.id === id);
    if (reservation) {
      setReservationTrouvee(reservation);
    } else {
      setReservationTrouvee(null);
    }
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
        <span>Welcome, {user.client?.prenom || "User "}!</span>
        <button onClick={handleDisconnect} className="header-button">
          Déconnexion
        </button>
      </header>
      <main>
        <section className="dashboard-container">
          <h1>Dashboard</h1>
          <p>Email: {user.client?.courriel || "N/A"}</p>
          <div className="button-container">
            <button onClick={() => setShowForm(!showForm)} className="button-green">
              {showForm ? "Annuler" : "Ajouter une Réservation"}
            </button>
            <button onClick={rechercheReservations} className="button-info">
              Afficher les Réservations
            </button>
            <button onClick={effacerReservations} className="button-danger">
              Fermer 
            </button>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Entrez l'ID de réservation"
              value={idReservation}
              onChange={(e) => setIdReservation(e.target.value)}
            />
            <button
              className="button-blue"
              onClick={() => rechercherReservation(idReservation)}
            >
              Rechercher une réservation
            </button>
          </div>
          {reservationTrouvee && (
            <p className="reservation-result">
              Réservation trouvée pour {reservationTrouvee.client.prenom} {reservationTrouvee.client.nom} du {reservationTrouvee.du} au {reservationTrouvee.au}
            </p>
          )}
        </section>

        {showForm && (
          <section className="add-reservation-form">
            <h2>Ajouter une Réservation</h2>
            <input
              type="number"
              name="fk_id_client"
              value={newReservation.fk_id_client}
              onChange={handleChange}
              placeholder="ID du client"
            />
            <input type="number"
              name="fk_id_chambre"
              value={newReservation.fk_id_chambre}
              onChange={handleChange}
              placeholder="ID de la chambre"
            />
            <input
              type="date"
              name="dateDebut"
              value={newReservation.dateDebut}
              onChange={handleChange}
              placeholder="Date de début"
            />
            <input
              type="date"
              name="dateFin"
              value={newReservation.dateFin}
              onChange={handleChange}
              placeholder="Date de fin"
            />
            <input
              type="number"
              name="prixParJour"
              value={newReservation.prixParJour}
              onChange={handleChange}
              placeholder="Prix par jour"
            />
            <input
              type="text"
              name="infoReservation"
              value={newReservation.infoReservation}
              onChange={handleChange}
              placeholder="Informations sur la réservation"
            />
            <h3>Informations sur la Chambre</h3>
            <input
              type="text"
              name="numero_chambre"
              value={newReservation.chambre.numero_chambre}
              onChange={(e) => handleNestedChange(e, 'chambre')}
              placeholder="Numéro de la chambre"
            />
            <input
              type="text"
              name="autre_informations"
              value={newReservation.chambre.autre_informations}
              onChange={(e) => handleNestedChange(e, 'chambre')}
              placeholder="Autres informations"
            />
            <input
              type="text"
              name="type_chambre"
              value={newReservation.chambre.type_chambre}
              onChange={(e) => handleNestedChange(e, 'chambre')}
              placeholder="Type de chambre"
            />
            <button onClick={handleAddReservation} className="button-add">
              Ajouter
            </button>
          </section>
        )}

<section className="reservation-container">
      <div className="tables-container">
        {reservations.length > 0 && (
          <ListeReservation
            title="Liste des Réservations"
            reservations={reservations}
            onModifierReservation={handleModifierReservation}
            onSupprimerReservation={handleSupprimerReservation}
          />
        )}
        {reservationsDisponible.length > 0 && (
          <ListeReservation
            title="Liste des Réservations Disponibles"
            reservations={reservationsDisponible}
            onModifierReservation={handleModifierReservation}
            onSupprimerReservation={handleSupprimerReservation}
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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