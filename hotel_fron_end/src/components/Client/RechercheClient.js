import { Component } from "react";
import ListeClient from "./ListeClient";

class RechercheClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: undefined // Initialize client state
    };
    this.rechercheClient = this.rechercheClient.bind(this);
    this.effacerClients = this.effacerClients.bind(this);
    this.ajouterClient = this.ajouterClient.bind(this); // Bind the new method
  }

  render() {
    let listeClient = null;
    if (this.state.client) {
      listeClient = <ListeClient client={this.state.client} />;
    }

    return (
      <>
        <button onClick={this.rechercheClient}>Rechercher</button>
        <button onClick={this.effacerClients}>Effacer</button>
        <button onClick={this.ajouterClient}>Ajouter</button> {/* New button */}
        {listeClient}
      </>
    );
  }

  rechercheClient() {
    this.setState({
      client: client // Sets the mock client list to the state
    });
  }

  effacerClients() {
    this.setState({
      client: undefined // Resets client to clear the list
    });
  }

  ajouterClient() {
    // Create a new client object
    const newClient = {
      client: {
        prenom: "Nouvel",
        nom: "Utilisateur",
        adresse: "5678 rue Nouveau, Québec",
        mobile: "418-999-8888"
      }
    };

    // Add the new client to the existing list
    this.setState((prevState) => ({
      client: prevState.client ? [...prevState.client, newClient] : [newClient]
    }));
  }
}

export default RechercheClient;

/* Mock JSON for initial data */
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
