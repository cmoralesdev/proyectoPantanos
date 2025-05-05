
import { useEffect, useState } from "react";
import Header from './components/Header';
import Banner from './components/Banner';
import axios from "axios";
import { useUser } from './context/UserContext';
import './Perfil.css';
import Footer from "./components/Footer";
import ReservaModal from "./components/ReservaModal";

export default function Perfil() {
    const [reservas, setReservas] = useState([]);
    const [reservaEditando, setReservaEditando] = useState(null); 
    const [showModal, setShowModal] = useState(false); 
    const user = useUser();




    useEffect(() => {
        const getReservas = async () => {
            try {
                const response = await axios.get("http://localhost:4000/reservas", {
                    params: { usuarioId: user.id }
                });
                setReservas(response.data);
            } catch (error) {
                console.error("Error al cargar reservas", error);
            }
        };

        if (user?.id) getReservas();
    }, [user]);




    const eliminarReserva = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/reservas/${id}`);
            setReservas(reservas.filter((res) => res.id !== id));
            window.alert("Reserva eliminada correctamente.");
        } catch (error) {
            console.error("Error al eliminar la reserva", error);
            window.alert("Hubo un error al intentar eliminar la reserva.");
        }
    };





    const actualizarReserva = (reserva) => {
        setReservaEditando(reserva);
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
                        reservas.map((res) => (
                            <div className="perfil-card" key={res.id}>
                                <h3>{res.pantanoNombre}</h3>
                                <img src={res.pantanoImagen} alt={res.pantanoNombre} width="250" />
                                <ul>
                                    <li><strong>Fecha:</strong> {res.fecha}</li>
                                    <li><strong>Guía:</strong> {res.guiaNombre}</li>
                                    <li><strong>Estado:</strong> {res.status}</li>
                                </ul>
                                <div className="perfil-botones">
                                    <button onClick={() => actualizarReserva(res)}>Actualizar</button>
                                    <button onClick={() => eliminarReserva(res.id)}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal de actualización */}
            {showModal && (
                <ReservaModal
                    pantano={{
                        id: reservaEditando.pantanoId,
                        nombre: reservaEditando.pantanoNombre,
                        imagen: reservaEditando.pantanoImagen
                    }}
                    reserva={reservaEditando}
                    onClose={async () => {
                        setShowModal(false);
                        setReservaEditando(null);
                        // Vuelve a cargar las reservas después de cerrar el modal
                        try {
                            const response = await axios.get("http://localhost:4000/reservas", {
                                params: { usuarioId: user.id }
                            });
                            setReservas(response.data);
                        } catch (error) {
                            console.error("Error al refrescar reservas después de actualizar", error);
                        }
                    }}
                />
            )}

            <Footer />
        </>
    );
}