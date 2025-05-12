import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./config/firebase.config";
import { useNavigate } from "react-router-dom";
import "./Registro.css"; 
import Header from "./components/Header";

export default function RecoverPass() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            window.alert("Por favor, introduce un correo válido.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            window.alert("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
            navigate("/login");
        } catch (error) {
            console.error("Error al enviar correo de recuperación:", error);
            window.alert("Error al enviar el correo. Asegúrate de que el email es correcto y que está registrado.");
        }
    };

    return (
        <div className="auth-container">
            <Header />
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit">Enviar Correo de Recuperación</button>
            </form>
            <p style={{ marginTop: "1rem" }}>
                ¿Recordaste tu contraseña? <a href="/login">Volver al Login</a>
            </p>
        </div>
    );
}