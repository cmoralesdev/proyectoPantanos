import './GuiaCard.css';
import { useUser } from '../context/UserContext'; 

export default function GuiaCard({ guia }) {
    const { user } = useUser(); 

    return (
        <div className="guia-card">
            <h3>Guías disponibles</h3>
            <h4>{guia.nombre}</h4>

            {user && <p><strong>Teléfono:</strong> {guia.telefono}</p>}
        </div>
    );
}