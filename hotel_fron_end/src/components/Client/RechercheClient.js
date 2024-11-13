import { Component } from "react";
import ListeClient from "./ListeClient";

class RechercheClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: undefined // Initialize client state
    };
    this.rechercheClient = this.rechercheClient.bind(this);
    this.effacerClients = this.effacerClients.bind(this); // Correct method binding
  }

  render() {
    let listeClient = null;
    if (this.state.client) {
      listeClient = <ListeClient client={this.state.client} />;
    }

    return (
      <>
        <button onClick={this.rechercheClient}>Rechercher</button>
        <button onClick={this.effacerClients}>Effacer</button> {/* Corrected the method name */}
        {listeClient}
      </>
    );
  }

  rechercheClient() {
    this.setState({
      client: client // Sets the mock client list to the state
    });
  }

  effacerClients() { // Correct method name
    this.setState({
      client: undefined // Resets client to clear the list
    });
  }
}

export default RechercheClient;

/* json mock en attendant que l'on bind le front-end avec le back-end */
const client = [
  {
    client: {
      prenom: "Jean",
      nom: "Saisrien",
      adresse: "1234 rue Des Tulipes, Gaspé",
      mobile: "418-123-4567"
    }
  },
  {
    client: {
      prenom: "Paul",
      nom: "Therrien",
      adresse: "6789 rue Des Érables, Matane",
      mobile: "418-456-1234"
    }
  }
];
