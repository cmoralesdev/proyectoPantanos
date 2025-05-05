// src/components/Footer.jsx
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Pesca Segura. Todos los derechos reservados.</p>
        </footer>
    );
}