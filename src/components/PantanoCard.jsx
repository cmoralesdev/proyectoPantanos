
import { Link } from "react-router-dom";


export default function PantanoCard({ pantano }) {
  return (
    
    <div className="pantano-card">

      
      <h2>{pantano.nombre}</h2>

      <img src={pantano.imagen} alt={pantano.nombre} width="250" />


      <ul>
        <li><strong>Peces:</strong> {pantano.peces.join(', ')}</li>
        <li><strong>Valoración:</strong> {pantano.valoracion} ⭐</li>

      </ul>
      <Link to={`/${pantano.id}`} state={{ pantano }}><button>Ver detalles</button></Link>
    </div>
  );
}

