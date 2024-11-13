import { Component } from "react";
import Client from "./Client";

class ListeClient extends Component {
  render() {
    const listeClient = this.props.client.map((client, index) => (
      <Client key={index} client={client} />
    ));

    return <>{listeClient}</>;
  }
}

export default ListeClient;
