import React from 'react';

const AlertCard = ({ alerta }) => {
    // Asignar un color de fondo dinámico según la criticidad
    const getCriticidadEstilo = (nivel) => {
        switch (nivel) {
            case 'Alta': return { backgroundColor: '#ffebe6', borderColor: '#ff4d4f', color: '#d32f2f' };
            case 'Media': return { backgroundColor: '#fffbe6', borderColor: '#ffe58f', color: '#b78103' };
            case 'Baja': return { backgroundColor: '#f6ffed', borderColor: '#b7eb8f', color: '#389e0d' };
            default: return { backgroundColor: '#f5f5f5', borderColor: '#d9d9d9', color: '#595959' };
        }
    };

    const estilo = getCriticidadEstilo(alerta.criticidad);

    return (
        <div style={{
            border: '2px solid',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '12px',
            fontFamily: 'sans-serif',
            transition: 'transform 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            ...estilo
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>⚠️ {alerta.tipo}</h3>
                <span style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85em' }}>
                    [{alerta.criticidad}]
                </span>
            </div>
            <p style={{ margin: '4px 0', fontSize: '0.9em' }}><strong>IP Origen:</strong> {alerta.ip_origen}</p>
            <p style={{ margin: '4px 0', fontSize: '0.9em' }}><strong>Timestamp:</strong> {alerta.timestamp}</p>
            <div style={{ marginTop: '10px', fontSize: '0.85em', textAlign: 'right' }}>
                <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: 'rgba(0,0,0,0.05)',
                    fontWeight: '500'
                }}>
                    Estado: {alerta.estado}
                </span>
            </div>
        </div>
    );
};

export default AlertCard;