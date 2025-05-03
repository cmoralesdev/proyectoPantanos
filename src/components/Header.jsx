import { Link } from "react-router-dom";
import './Header.css';
import logo from '../assets/logo.png';

export default function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="header-right">
                <Link to="/perfil" className="perfil-icon" title="Perfil">
                    👤
                </Link>
            </div>
        </header>
    );
}