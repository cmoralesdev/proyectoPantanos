
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import './ReservaModal.css';

export default function ReservaModal({ pantano, onClose }) {
    const { register, handleSubmit, reset } = useForm();
    const [guias, setGuias] = useState([]);
    const user = useUser();

    useEffect(() => {
        const getGuias = async () => {
            try {
                const response = await axios.get("http://localhost:4000/guias", {
                    params: { pantanoId: pantano.id }
                });
                setGuias(response.data);
            } catch (error) {
                console.error("Error al cargar guías:", error);
            }
        };

        getGuias();
    }, [pantano.id]);

    const onSubmit = async (data) => {
        try {
            const selectedGuia = guias.find((g) => g.id === data.guiaId);
            const nuevaReserva = {
                ...data,
                pantanoId: pantano.id,
                pantanoNombre: pantano.nombre,
                pantanoImagen: pantano.imagen,
                usuarioId: user.id,        
                nombre: user.nombre,   
                guiaNombre: selectedGuia?.nombre,    
                status: "pendiente",
                creadaEn: new Date().toISOString(),
            };

            await axios.post("http://localhost:4000/reservas", nuevaReserva);
            reset();
            onClose();
        } catch (error) {
            console.error("Error al crear reserva:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Reservar en {pantano.nombre}</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p><strong>Reservando como:</strong> {user.nombre}</p>

                    <label>Fecha:
                        <input type="date" {...register("fecha", { required: true })} />
                    </label>

                    <label>Guía:
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
                        <button type="button" onClick={() => { reset(); onClose(); }}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}