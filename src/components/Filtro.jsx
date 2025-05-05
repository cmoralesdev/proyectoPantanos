
import React from 'react';
import './Filtro.css';

export default function Filtro({
    comunidadSeleccionada,
    setComunidadSeleccionada,
    valoracion,
    setValoracion
}) {
    return (
        <aside className="filtro">
            <h3>Filtrar por comunidad</h3>
            <select
                value={comunidadSeleccionada}
                onChange={(e) => setComunidadSeleccionada(e.target.value)}
            >
                <option value="">Todas</option>
                <option value="Madrid">Madrid</option>
                <option value="Aragón">Aragón</option>
                <option value="Andalucía">Andalucía</option>
                <option value="Extremadura">Extremadura</option>
                <option value="Valencia">Valencia</option>
            </select>

            <h3>Filtrar por valoración</h3>
            <select
                value={valoracion}
                onChange={(e) => setValoracion(e.target.value)}
            >
                <option value="">Todas</option>
                <option value="1">1⭐</option>
                <option value="2">2⭐</option>
                <option value="3">3⭐</option>
                <option value="4">4⭐</option>
                <option value="5">5⭐</option>
            </select>
        </aside>
    );
}