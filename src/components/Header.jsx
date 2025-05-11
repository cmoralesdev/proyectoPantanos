/*import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";
import { useUser } from "../context/UserContext";

export default function Header() {
    const { logout } = useUser();

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="header-right">
                <button onClick={logout}></button>
                <Link to="/perfil" className="perfil-icon" title="Perfil">
                    👤
                </Link>
            </div>
        </header>
    );
}*/


/*

import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";
import { useUser } from "../context/UserContext";

export default function Header() {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handlePerfilClick = () => {
        if (user) {
            navigate("/perfil");
        } else {
            navigate("/login");
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="header-right">
                {user && (
                    <button className="logout-button" onClick={logout}>
                        Logout
                    </button>
                )}
                <span 
                    className="perfil-icon" 
                    title="Perfil" 
                    onClick={handlePerfilClick} 
                    style={{ cursor: "pointer" }}
                >
                    👤
                </span>
            </div>
        </header>
    );
}

*/

import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";
import { useUser } from "../context/UserContext";

export default function Header() {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handlePerfilClick = () => {
        if (user) {
            navigate("/perfil");
        } else {
            navigate("/login");
        }
    };

    const handleLogout = async () => {
        await logout(); // Espera a que cierre sesión
        navigate("/");  // Redirige al home
    };

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="header-right">
                {user && (
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                )}
                <span 
                    className="perfil-icon" 
                    title="Perfil" 
                    onClick={handlePerfilClick} 
                    style={{ cursor: "pointer" }}
                >
                    👤
                </span>
            </div>
        </header>
    );
}