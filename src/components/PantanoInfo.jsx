
import './PantanoInfo.css';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function PantanoInfo({ pantano, onReservar, onVolver }) {
    const { user } = useUser();
    const navigate = useNavigate();

    const handleReservar = () => {
        if (!user) {
            navigate("/login");
            return; 
        }
        onReservar(); 
    };

    return (
        <div className="pantano-content">
            <div className="pantano-imagen">
                <img src={pantano.imagen} alt={pantano.nombre} />
            </div>

            <div className="pantano-detalles">
                <h2>{pantano.nombre}</h2>
                <ul>
                    <li><strong>Descripción:</strong> {pantano.caracteristicas}</li>
                    <li><strong>Especies:</strong> {pantano.especies.join(', ')}</li>
                    <li><strong>Comunidad:</strong> {pantano.comunidad}</li>
                    <li><strong>Valoración:</strong> {pantano.valoracion} ⭐</li>
                </ul>
                <div className="detalles-botones">
                    <button onClick={handleReservar}>Reservar</button>
                    <button onClick={onVolver}>Volver</button>
                </div>
            </div>
        </div>
    );
}