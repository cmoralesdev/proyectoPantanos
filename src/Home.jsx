
import { useState, useEffect } from 'react';
import './Home.css';
import PantanoCard from './components/PantanoCard';
import Header from './components/Header';
import Filtro from './components/Filtro';
import Banner from './components/Banner';
import axios from 'axios';

export default function Home() {
  const [pantanos, setPantanos] = useState([]);
  const [comunidadSeleccionada, setComunidadSeleccionada] = useState('');

  useEffect(() => {
    const getPantanos = async () => {
      try {
        const response = await axios.get("http://localhost:4000", {
          params: { comunidad: comunidadSeleccionada || undefined }
        });
        setPantanos(response.data);
      } catch (error) {
        console.error("Error al obtener pantanos:", error);
      }
    };

    getPantanos();
  }, [comunidadSeleccionada]);

  return (
    <div className="home-container">

      <Header />

      <Banner />

      <div className="content">
        <Filtro 
          comunidadSeleccionada={comunidadSeleccionada}
          setComunidadSeleccionada={setComunidadSeleccionada}
        />

        <section className="pantano-container">
          {pantanos.map((pantano) => (
            <PantanoCard key={pantano.id} pantano={pantano} />
          ))}
        </section>
      </div>
    </div>
  );
}