import { Component } from "react";
import { Outlet, Link } from "react-router-dom";

class Menu extends Component {
    render() {
        return (
         <>
            <Link to="/client">Client</Link>
            <br></br>
            <Link to="/admin">Administration</Link>
            <br></br>
            <Link to="/">Réservations</Link>
            <br></br>
            <br></br>
            <Outlet />
         </>
        );
    }
}

export default Menu;