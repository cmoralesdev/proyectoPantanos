import { Link } from "react-router-dom";
import './Header.css';
import logo from '../assets/logo.png';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";


export default function Header() {


    const logout= async() => {
        await signOut(auth)
    }


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
}