import React, { useState } from "react";
import './inscriptionStyle.css'; // Ajoute du fichier CSS

function Inscription() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState(""); // État pour l'email
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState("");
  const [acceptTermes, setAcceptTermes] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // État pour les messages d'erreur

  const handleSubmit = (event) => {
    event.preventDefault();

    // Logique de validation fictive
    const existingEmails = ["test@example.com"]; // Simule des emails existants
    const existingTelephones = ["0123456789"]; // Simule des numéros de téléphone existants

    // Vérification des champs obligatoires
    if (!nom || !prenom || !adresse || !telephone || !email || !motDePasse || !confirmationMotDePasse) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    if (existingEmails.includes(email)) {
      setErrorMessage("Cet email est déjà utilisé.");
      return;
    }

    if (existingTelephones.includes(telephone)) {
      setErrorMessage("Ce numéro de téléphone est déjà utilisé.");
      return;
    }

    if (motDePasse !== confirmationMotDePasse) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!acceptTermes) {
      setErrorMessage("Vous devez accepter les termes et conditions.");
      return;
    }

    setErrorMessage(""); // Réinitialiser les messages d'erreur
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
            <i className="fas fa-user"></i>
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
            <i className="fas fa-envelope"></i> {/* Icône pour l'email */}
          </div>
          <input 
            type="email" 
            placeholder="Courriel" 
            value={email} 
            onChange={(event) => setEmail(event.target.value)} 
          />
        </div>
        <div className="input-field">
          <div className="icon-container">
            <i className="fas fa-lock"></i>
          </div>
          <input 
            type="password" 
            placeholder="Mot de passe" 
            value={motDePasse} onChange={(event) => setMotDePasse(event.target.value)} 
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
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Affichage du message d'erreur */}
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