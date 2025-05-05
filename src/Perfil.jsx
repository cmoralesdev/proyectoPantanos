
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
                        reservas.map((item) => (
                            <div className="perfil-card" key={item.reserva.id}>
                                <h3>{item.pantano.nombre}</h3>
                                <img src={item.pantano.imagen} alt={item.pantano.nombre} width="250" />
                                <ul>
                                    <li><strong>Fecha:</strong> {item.reserva.fecha}</li>
                                    <li><strong>Guía:</strong> {item.guia?.nombre}</li>
                                    <li><strong>Estado:</strong> {item.reserva.status}</li>
                                </ul>
                                <div className="perfil-botones">
                                    <button onClick={() => actualizarReserva(item)}>Actualizar</button>
                                    <button onClick={() => eliminarReserva(item.reserva.id)}>Eliminar</button>
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
                        id: reservaEditando.pantano.id,
                        nombre: reservaEditando.pantano.nombre,
                        imagen: reservaEditando.pantano.imagen
                    }}
                    reserva={reservaEditando}
                    onClose={async () => {
                        setShowModal(false);
                        setReservaEditando(null);
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