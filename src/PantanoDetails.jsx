import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useForm } from 'react-hook-form';
import './PantanoDetails.css';

export default function PantanoDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); 

  const pantanoInicial = location.state?.pantano;
  const [pantano, setPantano] = useState(pantanoInicial);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Reserva enviada:", data);
    setShowModal(false);
    reset();
  };

  useEffect(() => {
    const getPantano = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/${id}`);
        setPantano(response.data);
      } catch (error) {
        console.error("Error al obtener pantanos:", error);
      }
    };
    if (!pantano) getPantano();
  }, []);

  if (!pantano) return <p>Cargando pantano...</p>;

  return (
    <div className="pantano-details">

      <div className="banner">
        <img src="https://cdn2.rtva.interactvty.com/content_cards/9b6bf7346fc2408bbc3d8725251f330e.png" alt="Banner Pantanos" />
      </div>

      <div className="pantano-content">
        <div className="pantano-imagen">
          <img src={pantano.imagen} alt={pantano.nombre} />
        </div>

        
        <div className="pantano-detalles">
          <h2>{pantano?.nombre}</h2>
          <ul>
            <li><strong>Descripción:</strong> {pantano?.caracteristica}</li>
            <li><strong>Peces:</strong> {pantano?.peces.join(', ')}</li>
            <li><strong>Comunidad:</strong> {pantano?.comunidad}</li>
            <li><strong>Guías:</strong> {pantano?.guias}</li>
            <li><strong>Valoración:</strong> {pantano?.valoracion} ⭐</li>
          </ul>
          <div className="detalles-botones">  
            <button onClick={() => setShowModal(true)}>Reservar</button>
            <button onClick={() => navigate("/")}>Volver</button>
          </div>
        </div>
      </div>


      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Reservar en {pantano.nombre}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Nombre:
                <input {...register("nombre", { required: true })} />
              </label>
              <label>Fecha:
                <input type="date" {...register("fecha", { required: true })} />
              </label>
              <div className="modal-buttons">
                <button type="submit">Enviar</button>
                <button type="button" onClick={() => { setShowModal(false); reset(); }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
