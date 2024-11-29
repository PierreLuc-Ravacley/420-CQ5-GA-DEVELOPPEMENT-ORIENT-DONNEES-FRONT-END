import React, { Component } from "react";
import ListeReservation from "./ListeReservation";
import logoChambre from "../../logo/chambreDouble.jpeg";
import logoChambre2 from "../../logo/chambreKing.jpeg";
import "./../../Style/App.css";

class RechercheReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.rechercheReservations = this.rechercheReservations.bind(this);
        this.effacerReservations = this.effacerReservations.bind(this);
    }

    render() {
        let listeReservation = null;
        let listeReservationDisponible = null;

        if (this.state.reservations) {
            listeReservation = (
                <ListeReservation
                    title="Liste des Réservations"
                    reservations={this.state.reservations}
                />
            );
        }

        if (this.state.reservationsDisponible) {
            listeReservationDisponible = (
                <ListeReservation
                    title="Liste des Réservations Disponibles"
                    reservations={this.state.reservationsDisponible}
                />
            );
        }

        return (
            <>
                <header className="header">
                    <img
                        src={require("../../logo/hotel_logo.png")}
                        alt="Hotel Logo"
                        className="header-logo"
                    />
                    <button className="header-button">Déconnexion</button>
                </header>
                <main>
                    <button onClick={this.rechercheReservations} className="button-info">Rechercher</button>
                    <button onClick={this.effacerReservations} className="button-danger">Effacer</button>
                    <div className="tables-container">
                        {listeReservation}
                        {listeReservationDisponible}
                    </div>
                </main>
            </>
        );
    }

    rechercheReservations() {
        this.setState({
            reservations,
            reservationsDisponible,
        });
    }

    effacerReservations() {
        this.setState({
            reservations: [],
            reservationsDisponible: [],
        });
    }
}

export default RechercheReservation;

/* Mock Data */
const reservations = [
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

const reservationsDisponible = [
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
