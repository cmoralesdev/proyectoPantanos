import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Banner from './components/Banner';
import Header from './components/Header';
import ReservaModal from './components/ReservaModal';
import PantanoInfo from './components/PantanoInfo';
import './PantanoDetails.css';
import './Home.css'
import Guias from './components/Guias';


export default function PantanoDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const pantanoInicial = location.state?.pantano;
  const [pantano, setPantano] = useState(pantanoInicial);
  const [showModal, setShowModal] = useState(false);

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

      <Header />

      <Banner />

      <PantanoInfo
        pantano={pantano}
        onReservar={() => setShowModal(true)}
        onVolver={() => navigate("/")}
      />

      <Guias pantanoId={pantano.id} />


      {showModal && (
        <ReservaModal pantano={pantano} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
