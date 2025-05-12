import './GuiaCard.css'

export default function GuiaCard({ guia }) {
    return (
        <div className="guia-card">
            <h3>Guías disponibles</h3>
            <h4>{guia.nombre}</h4>
            
            <p><strong>Teléfono</strong> {guia.telefono}</p>
            
        </div>
    );
}