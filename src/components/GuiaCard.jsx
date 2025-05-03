import './GuiaCard.css'

export default function GuiaCard({ guia }) {
    return (
        <div className="guia-card">
            <h4>{guia.nombre}</h4>
            <p><strong>Contacto</strong> {guia.telefono}</p>
            
        </div>
    );
}