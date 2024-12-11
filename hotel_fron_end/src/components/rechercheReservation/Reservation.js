import { Component } from "react";
import "./../../Style/reservationStyle.css";

class Reservation extends Component {
    render() {
        const { du, au, client, chambre, prix } = this.props.reservation;

        return (
            <tr>
                <td className="reservationvaleur">{du} au {au}</td>
                <td className="reservationvaleur">{client.prenom} {client.nom}</td>
                <td className="reservationvaleur">{client.adresse}</td>
                <td className="reservationvaleur">{client.mobile}</td>
                <td className="reservationvaleur">Chambre {chambre.numero}</td>
                <td className="reservationvaleur">{prix} $</td>
                <td>
                    <img
                        src={chambre.logo}
                        alt={`Chambre ${chambre.numero}`}
                        style={{ width: "100px", borderRadius: "8px" }}
                    />
                </td>
            </tr>
        );
    }
}

export default Reservation;