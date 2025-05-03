import React from 'react';
import './Filtro.css';

export default function Filtro({ comunidadSeleccionada, setComunidadSeleccionada }) {
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
        </aside>
    );
}