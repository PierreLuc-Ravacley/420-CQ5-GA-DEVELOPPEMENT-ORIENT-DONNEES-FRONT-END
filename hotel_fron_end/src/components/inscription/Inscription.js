import React, { useState } from "react";
import './inscriptionStyle.css'; // Ajoute du fichier CSS

function Inscription() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
 //  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState("");
  const [acceptTermes, setAcceptTermes] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulaire envoyé !");
    // logique pour envoyer les données à le backend
  };

  return (
    <div className="inscription">
      <p>Veuillez compléter le formulaire suivant :</p> 
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <div className="icon-container">
            <i className="fas fa-user"></i>
          </div>
          <input 
            type="text" 
            placeholder="Nom" 
            value={nom} 
            onChange={(event) => setNom(event.target.value)} 
          />
        </div>
        <div className="input-field">
          <div className="icon-container">
            <i className="fas fa-user "></i>
          </div>
          <input 
            type="text" 
            placeholder="Prénom" 
            value={prenom} 
            onChange={(event) => setPrenom(event.target.value)} 
          />
        </div>
        <div className="input-field">
          <div className="icon-container">
            <i className="fas fa-home"></i>
          </div>
          <input 
            type="text" 
            placeholder="Adresse" 
            value={adresse} 
            onChange={(event) => setAdresse(event.target.value)} 
          />
        </div>
        <div className="input-field">
          <div className="icon-container">
            <i className="fas fa-phone"></i>
          </div>
          <input 
            type="tel" 
            placeholder="Téléphone" 
            value={telephone} 
            onChange={(event) => setTelephone(event.target.value)} 
          />
        </div>
        <div className="input-field">
          <div className="icon-container">
            <i className="fas fa-lock"></i>
          </div>
          <input 
            type="password" 
            placeholder="Mot de passe" 
            value={motDePasse} 
            onChange={(event) => setMotDePasse(event.target.value)} 
          />
        </div>
        <div className="input-field">
          <div className="icon-container">
            <i className="fas fa-lock"></i>
          </div>
          <input 
            type="password" 
            placeholder="Confirmer le mot de passe" 
            value={confirmationMotDePasse} 
            onChange={(event) => setConfirmationMotDePasse(event.target.value)} 
          />
        </div>
        <div className="checkbox-field">
          <input 
            type="checkbox" 
            checked={acceptTermes} 
            onChange={() => setAcceptTermes(!acceptTermes)} 
          />
          <label className="termes"> J'accepte les termes et conditions</label>
        </div>
        <button type="submit" disabled={!acceptTermes}>Créer le compte</button>
      </form>
    </div>
  );
}

export default Inscription;