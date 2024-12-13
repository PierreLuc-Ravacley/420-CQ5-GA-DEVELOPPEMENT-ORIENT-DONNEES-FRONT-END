import React, { useState } from 'react';

const ListeReservation = ({ title, reservations, onModifierReservation, onSupprimerReservation, reservationTrouvee }) => {
  const [reservationEnCours, setReservationEnCours] = useState(null);
  const [formData, setFormData] = useState({});

  const handleModifier = (reservation) => {
    setReservationEnCours(reservation);
    setFormData({
      ...reservation,
      client: { ...reservation.client },
      chambre: { ...reservation.chambre },
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    setFormData((prev) => {
      if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onModifierReservation({ ...formData, id: reservationEnCours.id });
    setReservationEnCours(null);
  };

  const handleCancel = () => {
    setReservationEnCours(null);
  };

  const handleSupprimer = (reservation) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      onSupprimerReservation(reservation);
    }
  };

  return (
    <div>
      <h2>{title}</h2>



      {/* Formulaire de modification */}
      {reservationEnCours && (
        <div className="modifier-reservation-container">
          <h3>Modifier la Réservation</h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              Prénom :
              <input
                type="text"
                name="client.prenom"
                value={formData.client.prenom || ''}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Nom :
              <input
                type="text"
                name="client.nom"
                value={formData.client.nom || ''}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Numéro de Chambre :
              <input
                type="text"
                name="chambre.numero"
                value={formData.chambre.numero || ''}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Du :
              <input
                type="date"
                name="du"
                value={formData.du || ''}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Au :
              <input
                type="date"
                name="au"
                value={formData.au || ''}
                onChange={handleFormChange} />
            </label>
            <label>
              Prix :
              <input
                type="number"
                name="prix"
                value={formData.prix || ''}
                onChange={handleFormChange}
              />
            </label>
            <button className="edit-button" type="submit">Sauvegarder</button>
            <button className="delete-button" type="button" onClick={handleCancel}>
              Annuler
            </button>
          </form>
        </div>
      )}

      {/* Liste des réservations */}
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Chambre</th>
            <th>Du</th>
            <th>Au</th>
            <th>Prix</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>
                {reservation.client.prenom} {reservation.client.nom}
              </td>
              <td>{reservation.chambre.numero}</td>
              <td>{reservation.du}</td>
              <td>{reservation.au}</td>
              <td>{reservation.prix}</td>
              <td>
                <button className="edit-button" onClick={() => handleModifier(reservation)}>Modifier</button>
                <button className="delete-button" onClick={() => handleSupprimer(reservation)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeReservation;