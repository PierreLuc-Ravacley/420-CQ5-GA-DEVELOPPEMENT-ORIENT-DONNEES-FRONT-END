import { Component } from "react";
import "./../../Style/reservationStyle.css";

class Reservation extends Component {
  handleModifier = () => {
    // Code pour modifier la réservation
    const reservation = this.props.reservation;
    this.props.onModifierReservation(reservation);
  };

  handleSupprimer = () => {
    // Code pour supprimer la réservation
    const reservation = this.props.reservation;
    this.props.onSupprimerReservation(reservation);
  };

  render() {
    const { du, au, client, chambre, prix } = this.props.reservation;

    return (
      <>
        <td className="reservationvaleur">{du} au {au}</td>
        <td className="reservationvaleur">{client.prenom} {client.nom}</td>
        <td className="reservationvaleur">{client.adresse}</td>
        <td className="reservationvaleur">{client.mobile}</td>
        <td className="reservationvaleur">Chambre {chambre.numero}</td>
        <td className="reservationvaleur">{prix} $ </td>
        <td>
          <img
            src={chambre.logo}
            alt={`Chambre ${chambre.numero}`}
            style={{ width: "100px", borderRadius: "8px" }}
          />
        </td>
        <td>
          <button onClick={this.handleModifier}>Modifier</button>
          <button onClick={this.handleSupprimer}>Supprimer</button>
        </td>
      </>
    );
  }
}

export default Reservation;