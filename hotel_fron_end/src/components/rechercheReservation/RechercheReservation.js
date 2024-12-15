import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListeReservation from "./ListeReservation";
import logoChambre from "../../logo/chambreDouble.jpeg";
import logoChambre2 from "../../logo/chambreKing.jpeg";
import "./../../Style/reservationStyle.css";
import instance from "../../axiosConfig";

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
    },
    client: {
      prenom: "",
      nom: "",
      adresse: "",
      mobile: ""
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [paddingTop, setPaddingTop] = useState("10vh");
  const [reservationToEdit, setReservationToEdit] = useState(null);
  const [idReservation, setIdReservation] = useState("");
  const [reservationTrouvee, setReservationTrouvee] = useState(null);
  const [showReservations, setShowReservations] = useState(false);
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
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const rechercherReservation = (id) => {
    const criteres = {
      idReservation: id,
      idClient: "",
      idChambre: "",
      nom: "",
      prenom: ""
    };
  
    instance.post("/rechercherReservation", criteres)
      .then((response) => {
        console.log("Réponse API :", response.data);
        setReservations(response.data); // Met à jour l'état des réservations
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche :", error);
      });
  };
  
  // Utilisation d'un effet pour détecter les changements dans `reservations`
  useEffect(() => {
    if (idReservation && Array.isArray(reservations)) {
      const reservation = reservations.find(
        (r) => r.id_reservation.toUpperCase() === idReservation.toUpperCase()
      );
      if (reservation) {
        setReservationTrouvee(reservation);
        setShowReservations(true);
      } else {
        setReservationTrouvee(null);
      }
    }
  }, [reservations, idReservation]);

  const rechercheReservations = () => {
    resetNewReservation();
    //setReservationsDisponible(mockReservationsDisponible);
    setShowReservations(true);
    setPaddingTop("90vh");
  };

  const effacerReservations = () => {
    setReservations([]);
    setReservationsDisponible([]);
    setIdReservation(""); 
    setReservationTrouvee(null); 
    setShowReservations(false); 
    
  };

  // Function to handle adding a new reservation
  const handleAddReservation = () => {
    const criteres = {
      "id_reservation": null,
      "fk_id_client": newReservation.fk_id_client,
      "fk_id_chambre": newReservation.fk_id_chambre,
      "dateDebut": newReservation.dateDebut,
      "dateFin": newReservation.dateFin,
      "prixParJour": newReservation.prixParJour,
      "infoReservation": newReservation.infoReservation,
      "chambre": null,
      "client": null
    }
    instance.post("/creerReservation", criteres)
    .then(setReservations)
    .catch(console.log);
    //setReservations([...reservations, reservationToAdd]);
    resetNewReservation();
  };

  const resetNewReservation = () => {
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
      },
      client: {
        prenom: "",
        nom: "",
        adresse: "",
        mobile: "",
      },
    });
    setShowForm(false);
    setPaddingTop("100vh");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReservation((prev) => ({ ...prev, [name]: value }));
    setPaddingTop("100vh");
  };

  const handleModifierReservation = (updatedReservation) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === updatedReservation.id ? updatedReservation : reservation
      )
    );
    setReservationsDisponible((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === updatedReservation.id ? updatedReservation : reservation
      )
    );
  };

  const handleUpdateReservation = (updatedReservation) => {
    const updatedReservations = reservations.map((r) =>
      r.id === updatedReservation.id ? { ...r, ...updatedReservation } : r
    );
    setReservations(updatedReservations);
    setReservationToEdit(null);
    setPaddingTop("100vh");
 };

  const handleSupprimerReservation = (reservation) => {
    const updatedReservations = reservations.filter(r => r.id !== reservation.id);
    setReservations(updatedReservations);
    console.log('Réservation supprimée', reservation);
  };

  const handleNestedChange = (e, nestedKey) => {
    const { name, value } = e.target;

    if (nestedKey === 'chambre') {
      const chambreKey = name;
      setNewReservation((prev) => ({
        ...prev,
        chambre: { ...prev.chambre, [chambreKey]: value }
      }));
    }
    setPaddingTop("40vh");
  };
  useEffect(() => {
    if (reservations.length > 0 || reservationsDisponible.length > 0) {
      setShowReservations(true);
    }
  }, [reservations, reservationsDisponible]);
  

  if (!user) return null;

  return (
    <>
      <header className="header">
        <img
          src={require("../../logo/hotel_logo.png")}
          alt="Hotel Logo"
          className="header-logo"
        />
        <span>Welcome, {user.client?.prenom || "User        "}!</span>
        <button onClick={handleDisconnect} className="header-button">
          Déconnexion
        </button>
      </header>
      <main style={{ paddingTop: paddingTop }}>
        <section className="dashboard-container">
          <h1>Dashboard</h1>
          <p>Email: {user.client?.courriel || "N/A"}</p>
          <div className="button-container">
          <button
  onClick={() => {
    setShowForm(!showForm);
    setPaddingTop("80vh");
  }}
  className="button-green"
>
  {showForm ? "Annuler" : "Ajouter une Réservation"}
</button>

            <button onClick={rechercheReservations} className="button-info">
              Afficher les Réservations
            </button>
            <button onClick={effacerReservations} className="button-danger">
              Fermer 
            </button>
          </div>
        </section>

        {showForm && (
          <section className="add-reservation-form">
            <h2>Ajouter une Réservation</h2>
            <input
              type="text"
              name="fk_id_client"
              value={newReservation.fk_id_client}
              onChange={handleChange}
              placeholder="ID du client"
            />
            <input
              type="text"
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
        {reservationToEdit && (
          <section className="edit-reservation-form">
            <h2>Modifier la Réservation</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateReservation(reservationToEdit);
            }}>
              <div className="form-group">
                <label>Date de début :</label >
                <input
                  type="date"
                  value={reservationToEdit.dateDebut}
                  onChange={(e) =>
                    setReservationToEdit({ ...reservationToEdit, dateDebut: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Date de fin :</label>
                <input
                  type="date"
                  value={reservationToEdit.dateFin}
                  onChange={(e) =>
                    setReservationToEdit({ ...reservationToEdit, dateFin: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Prix par jour :</label>
                <input
                  type="number"
                  value={reservationToEdit.prixParJour}
                  onChange={(e) =>
                    setReservationToEdit({ ...reservationToEdit, prixParJour: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="button-update">Sauvegarder</button>
            </form>
          </section>
        )}

<section className="reservation-container">
  {showReservations && (
    <div className="tables-container">
      <h3>Rechercher une réservation</h3>
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
          Rechercher
        </button>
      </div>
      {reservationTrouvee ? (
        <ListeReservation
          title="Réservation Trouvée"
          reservations={[reservationTrouvee]}
          onModifierReservation={handleModifierReservation}
          onSupprimerReservation={handleSupprimerReservation}
        />
      ) : (
        idReservation && (
          <p>Aucune réservation trouvée pour cette ID.</p>
        )
      )}
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
  )}
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