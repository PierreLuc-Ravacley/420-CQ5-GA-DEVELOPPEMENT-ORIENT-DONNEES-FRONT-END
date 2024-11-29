import { Component } from "react";
import Reservation from "./Reservation";

class ListeReservation extends Component {
    render() {
        const listeReservation = this.props.reservations.map((reservation, index) => (
            <Reservation key={index} reservation={reservation} />
        ));

        return (
            <table>
                <thead>
                    {/* Title Row */}
                    <tr>
                        <th colSpan="7" className="table-header">{this.props.title}</th>
                    </tr>
                    {/* Column Headers */}
                    <tr>
                        <th>Dates</th>
                        <th>Client</th>
                        <th>Adresse</th>
                        <th>Mobile</th>
                        <th>Chambre</th>
                        <th>Prix</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>{listeReservation}</tbody>
            </table>
        );
    }
}

export default ListeReservation;
