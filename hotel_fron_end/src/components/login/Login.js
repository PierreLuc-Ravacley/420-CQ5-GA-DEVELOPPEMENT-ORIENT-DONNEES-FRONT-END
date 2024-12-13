import React, { Component } from "react";
import { useNavigate } from 'react-router-dom';
import RechercheReservation from "../rechercheReservation/RechercheReservation";
import './loginStyle.css';

// json mock en attendant que l'on bind le front-end avec le back-end 
const reservations = [
  {
    client: {
      prenom: "prenomTest1",
      nom: "nomTest1",
      adresse: "adresseTest1",
      mobile: "telephoneTest1",
      courriel: "courrielTest1@gmail.com",
      motdepasse: "motdepasseTest1" // unique password for client 1
    },
  },
  {
    client: {
      prenom: "prenomTest2",
      nom: "nomTest2",
      adresse: "adresseTest2",
      mobile: "telephoneTest2",
      courriel: "courrielTest2@gmail.com",
      motdepasse: "motdepasseTest2" // unique password for client 2
    },
  },
];

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    
    // Validate credentials against mock data
    const user = reservations.find(
      (reservation) => reservation.client.courriel === email
    );
    
    if (user && user.client.motdepasse === password) {
      // Store the user's session (this can be in localStorage or sessionStorage)
      sessionStorage.setItem("user", JSON.stringify(user));
      
      // Redirect to the dashboard using navigate
      this.props.navigate("/recherche");
    } else {
      this.setState({ error: "Invalid email or password" });
    }
  };

  render() {
    return (
      <>
        <title>Connexion</title>
        <form onSubmit={this.handleSubmit}>
          <h1>Connexion</h1>
          <p>Veuillez vous authentifier</p>
          <div className="loginField">
            <label htmlFor="courriel">Adresse courriel :</label>
            <input
              type="email"
              id="courriel"
              name="email"
              required
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="loginField">
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          {this.state.error && <p className="error-message">{this.state.error}</p>}
          <input type="submit" value="Se connecter" />
          <p className="signup-link">
            Nouveau client ? <a href="/inscription">S'inscrire ici</a>
          </p>
        </form>
      </>
    );
  }
}

// Wrap the component with `useNavigate` for navigation
function LoginWithNavigation(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default LoginWithNavigation;