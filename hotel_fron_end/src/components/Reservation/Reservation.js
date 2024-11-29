import { Component } from "react";

class Reservation extends Component {
    render() {
        const { du, au, client, chambre, prix } = this.props.reservation;

        return (
            <tr>
                <td>{du} au {au}</td>
                <td>{client.prenom} {client.nom}</td>
                <td>{client.adresse}</td>
                <td>{client.mobile}</td>
                <td>Chambre {chambre.numero}</td>
                <td>{prix} $</td>
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
