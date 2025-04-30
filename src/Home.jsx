import { useState, useEffect } from 'react';
import './Home.css';
import PantanoCard from './components/PantanoCard';
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
      
      <div className="banner">
        <img 
          src="https://cdn2.rtva.interactvty.com/content_cards/9b6bf7346fc2408bbc3d8725251f330e.png" 
          alt="Banner Pantanos"
        />
      </div>

      
      <div className="content">
        
        <aside className="filtro">
          <h3>Filtrar por comunidad</h3>
          <select 
            value={comunidadSeleccionada}
            onChange={(e) => setComunidadSeleccionada(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="Madrid">Madrid</option>
            <option value="Aragón">Aragón</option>
            <option value="Andalucia">Andalucia</option>
            <option value="Extremadura">Extremadura</option>
          </select>
        </aside>

        
        <section className="pantano-container">
          {pantanos.map((pantano) => (
            <PantanoCard key={pantano.id} pantano={pantano} />
          ))}
        </section>
      </div>
    </div>
  );
}

