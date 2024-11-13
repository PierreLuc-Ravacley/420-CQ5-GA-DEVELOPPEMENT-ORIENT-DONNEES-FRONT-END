import { Component, createRef } from "react";

class Client extends Component {
  constructor(props) {
    super(props);
    this.refClient = createRef();
    this.toggleInformationVisibility = this.toggleInformationVisibility.bind(this);
  }

  render() {
    const { client } = this.props;

    return (
      <>
        <div>
          <button
            className="button-info"
            onClick={() => this.toggleInformationVisibility(this.refClient)}
          >
            {client?.client?.prenom} {client?.client?.nom}
          </button>
          <p ref={this.refClient} hidden>
            {client?.client?.adresse}
            <br />
            {client?.client?.mobile}
          </p>
        </div>
      </>
    );
  }

  toggleInformationVisibility(ref) {
    ref.current.hidden = !ref.current.hidden;
  }
}

export default Client;
