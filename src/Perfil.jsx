import { useEffect, useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import axios from "axios";
import { useUser } from "./context/UserContext";
import "./Perfil.css";
import Footer from "./components/Footer";
import ReservaModal from "./components/ReservaModal";
import ReservaCard from "./ReservaCard";

export default function Perfil() {
    const [reservas, setReservas] = useState([]);
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const user = useUser();

    const getReservas = async (userId) => {
        if (!userId) return;
        try {
            const response = await axios.get("http://localhost:4000/reservas", {
                params: { usuarioId: userId },
            });
            setReservas(response.data);
        } catch (error) {
            console.error("Error al cargar reservas", error);
        }
    };

    useEffect(() => {
        getReservas(user?.id);
    }, [user?.id]);

    const eliminarReserva = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/reservas/${id}`);
            window.alert("Reserva eliminada correctamente.");
            getReservas(user?.id);
        } catch (error) {
            console.error("Error al eliminar la reserva", error);
            window.alert("Hubo un error al intentar eliminar la reserva.");
        }
    };

    const actualizarReserva = (reserva) => {
        setReservaSeleccionada(reserva);
        setShowModal(true);
    };

    return (
        <>
            <div className="perfil-container">
                <Header />
                <Banner />

                <h2>Mis Reservas</h2>
                <div className="reservas-container">
                    {reservas.length === 0 ? (
                        <p>No tienes reservas realizadas.</p>
                    ) : (
                        reservas.map((item) => (
                            <ReservaCard
                                item={item}
                                actualizarReserva={actualizarReserva}
                                eliminarReserva={eliminarReserva}
                                key={item.reserva.id}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Modal de actualización */}
            {showModal && (
                <ReservaModal
                    pantano={{
                        id: reservaSeleccionada.pantano.id,
                        nombre: reservaSeleccionada.pantano.nombre,
                        imagen: reservaSeleccionada.pantano.imagen,
                    }}
                    reserva={reservaSeleccionada}
                    onClose={() => {
                        setShowModal(false);
                        setReservaSeleccionada(null);
                        getReservas(user?.id);
                    }}
                />
            )}

            <Footer />
        </>
    );
}
