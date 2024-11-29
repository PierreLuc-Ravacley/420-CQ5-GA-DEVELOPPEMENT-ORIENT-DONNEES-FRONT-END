import './Style/App.css';
import RechercheReservation from "./components/Reservation/RechercheReservation";
import RechercheClient from "./components/Client/RechercheClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/menu/Menu";

function App() {
  return <RechercheReservation />
}

export default App;
