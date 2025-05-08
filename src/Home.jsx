import { useState, useEffect } from "react";
import "./Home.css";
import PantanoCard from "./components/PantanoCard";
import Header from "./components/Header";
import Filtro from "./components/Filtro";
import Banner from "./components/Banner";
import axios from "axios";
import Footer from "./components/Footer";
import QuienesSomos from "./components/QuienesSomos";

export default function Home() {
  const [pantanos, setPantanos] = useState([]);
  const [comunidadSeleccionada, setComunidadSeleccionada] = useState("");
  const [valoracion, setValoracion] = useState("");

  useEffect(() => {
    const getPantanos = async () => {
      try {
        const response = await axios.get("http://localhost:4000", {
          params: {
            comunidad: comunidadSeleccionada || undefined,
            valoracion: valoracion || undefined,
          },
        });
        setPantanos(response.data);
      } catch (error) {
        console.error("Error al obtener pantanos:", error);
      }
    };

    getPantanos();
  }, [comunidadSeleccionada, valoracion]);

  return (
    <>
      <div className="home-container">
        <Header />
        <Banner />
        <QuienesSomos />

        <div className="content">
          <Filtro
            comunidadSeleccionada={comunidadSeleccionada}
            setComunidadSeleccionada={setComunidadSeleccionada}
            valoracion={valoracion}
            setValoracion={setValoracion}
          />

          <section className="pantano-container">
            {pantanos.map((pantano) => (
              <PantanoCard key={pantano.id} pantano={pantano} />
            ))}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
