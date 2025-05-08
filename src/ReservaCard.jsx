import React from "react";

export default function ReservaCard({
    item,
    actualizarReserva,
    eliminarReserva,
}) {
    return (
        <div className="perfil-card">
            <h3>{item.pantano.nombre}</h3>
            <img src={item.pantano.imagen} alt={item.pantano.nombre} width="250" />
            <ul>
                <li>
                    <strong>Fecha:</strong> {item.reserva.fecha}
                </li>
                <li>
                    <strong>Guía:</strong> {item.guia?.nombre}
                </li>
                <li>
                    <strong>Estado:</strong> {item.reserva.status}
                </li>
            </ul>
            <div className="perfil-botones">
                <button onClick={() => actualizarReserva(item)}>Actualizar</button>
                <button onClick={() => eliminarReserva(item.reserva.id)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
}
