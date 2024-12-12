import React, { useState } from "react";

const ListeReservation = ({ title, reservations, onModifierReservation, onSupprimerReservation }) => {
  const [reservationEnCours, setReservationEnCours] = useState(null);
  const [formData, setFormData] = useState({});

  // Gestion de la modification
  const handleModifier = (reservation) => {
    setReservationEnCours(reservation);
    setFormData({ ...reservation }); // Pré-remplir les champs avec les données actuelles
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onModifierReservation(formData);
    setReservationEnCours(null); // Fermer la modale après la sauvegarde
  };

  const handleCancel = () => {
    setReservationEnCours(null); // Fermer la modale sans sauvegarder
  };

  // Gestion de la suppression
  const handleSupprimer = (reservation) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
      onSupprimerReservation(reservation);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Chambre</th>
            <th>Du</th>
            <th>Au</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.client.prenom} {reservation.client.nom}</td>
              <td>{reservation.chambre.numero}</td>
              <td>{reservation.du}</td>
              <td>{reservation.au}</td>
              <td>{reservation.prix}</td>
              <td>
                <button onClick={() => handleModifier(reservation)}>Modifier</button>
                <button onClick={() => handleSupprimer(reservation)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reservationEnCours && (
        <div className="modal">
          <div className="modal-content">
            <h3>Modifier la Réservation</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Prénom :
                <input
                  type="text"
                  name="client.prenom"
                  value={formData.client.prenom}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Nom :
                <input
                  type="text"
                  name="client.nom"
                  value={formData.client.nom}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Chambre :
                <input
                  type="text"
                  name="chambre.numero"
                  value={formData.chambre.numero}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Du :
                <input
                  type="date"
                  name="du"
                  value={formData.du}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Au :
                <input
                  type="date"
                  name="au"
                  value={formData.au}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Prix :
                <input
                  type="number"
                  name="prix"
                  value={formData.prix}
                  onChange={handleFormChange}
                />
              </label>
              <button type="submit">Sauvegarder</button>
              <button type="button" onClick={handleCancel}>Annuler</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeReservation;
