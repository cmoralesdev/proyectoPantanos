
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
        await logout();
        navigate("/");  
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
                        Cerrar sesión
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