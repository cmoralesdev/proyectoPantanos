
import React, { useState } from "react";
import { useUser } from "./context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import './Registro.css';
import Header from "./components/Header";


export default function Login() {
    const { login } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);

        }
    };

    return (

        <div className="auth-container">
            <Header />
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
            <p>
                ¿Olvidaste tu contraseña? <Link to="/recover">Recupérala aquí</Link>
            </p>
        </div>
    );
}