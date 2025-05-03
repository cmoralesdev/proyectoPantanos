
import './PantanoInfo.css';

export default function PantanoInfo({ pantano, onReservar, onVolver }) {
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
                    <button onClick={onReservar}>Reservar</button>
                    <button onClick={onVolver}>Volver</button>
                </div>
            </div>
        </div>
    );
}