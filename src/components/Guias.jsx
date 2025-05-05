import { useEffect, useState } from 'react';
import axios from 'axios';
import GuiaCard from './GuiaCard.jsx';

export default function Guias({ pantanoId }) {
    const [guias, setGuias] = useState([]);

    useEffect(() => {
        const getGuias = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/guias`, {
                    params: { pantanoId }
                });
                setGuias(response.data);
            } catch (error) {
                console.error("Error al obtener guías:", error);
            }
        };

        getGuias();
    }, [pantanoId]);

    if (guias.length === 0) return <p>No hay guías disponibles para este pantano.</p>;

    return (
        <div className="guias-container">
            
            {guias.map((guia) => (
                <GuiaCard key={guia.id} guia={guia} />
            ))}
        </div>
    );
}