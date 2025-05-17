
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import "./ReservaModal.css";

export default function ReservaModal({ pantano, onClose, reserva = null }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [guias, setGuias] = useState([]);
    const { user } = useUser();
    console.log(user.uid);

    useEffect(() => {
        if (reserva) {
            setValue("fecha", reserva.reserva.fecha);
            setValue("guiaId", reserva.guia.id);
        }
    }, [reserva, setValue]);

    useEffect(() => {
        const getGuias = async () => {
            try {
                const response = await axios.get("http://localhost:4000/guias", {
                    params: { pantanoId: pantano.id },
                });
                setGuias(response.data);
            } catch (error) {
                console.error("Error al cargar guías:", error);
            }
        };

        getGuias();
    }, [pantano.id]);

    const getMinDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split("T")[0]; 
    };

    const onSubmit = async (data) => {
        try {
            const datosReserva = {
                ...data,
                pantanoId: pantano.id,
                usuarioId: user.uid,
            };

            if (reserva) {
                await axios.put(
                    `http://localhost:4000/reservas/${reserva.reserva.id}`,
                    datosReserva
                );
                window.alert("Reserva actualizada correctamente.");
            } else {
                await axios.post("http://localhost:4000/reservas", datosReserva);
                window.alert("Reserva pendiente de aceptar.");
            }

            reset();
            onClose();
        } catch (error) {
            console.error("Error al guardar reserva:", error);
            window.alert("Error al guardar la reserva.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{reserva ? "Editar reserva" : `Reservar en ${pantano.nombre}`}</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Fecha:
                        <input 
                            type="date" 
                            {...register("fecha", { required: true })} 
                            min={getMinDate()} 
                        />
                    </label>

                    <label>
                        Guía:
                        <select {...register("guiaId", { required: true })}>
                            <option value="">Selecciona un guía</option>
                            {guias.map((guia) => (
                                <option key={guia.id} value={guia.id}>
                                    {guia.nombre}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className="modal-buttons">
                        <button type="submit">Enviar</button>
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}