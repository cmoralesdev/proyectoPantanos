/*import React, { useContext } from 'react'
import { useUser } from './context/UserContext';

export default function Login() {
    const {user,login} = useUser()


    return (
        <button onClick={login}> login </button>
    )
}
*/
import React, { useState } from "react";
import { useUser } from "./context/UserContext";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import './Registro.css'; // Reutilizamos el CSS de registro

export default function Login() {
    const { login } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook de navegación

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
        </div>
    );
}