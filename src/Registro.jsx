

import React, { useState } from "react";
import { useUser } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import './Registro.css';
import Header from "./components/Header";

export default function Registro() {
    const { register } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(email, password); 
            navigate("/");
        } catch (error) {
            console.error("Error al registrar:", error);
        
        }
    };

    return (
        <div className="auth-container">
            <Header />
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}