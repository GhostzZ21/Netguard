import React from 'react';

const AlertCard = React.memo(({ alerta, onEliminar }) => {
    const getColors = (nivel) => {
        switch (nivel) {
            case 'Alta': return { border: '#ff4d4f', text: '#b91c1c', bgBadge: '#fee2e2' };
            case 'Media': return { border: '#faad14', text: '#92400e', bgBadge: '#fef3c7' };
            case 'Baja': return { border: '#52c41a', text: '#166534', bgBadge: '#dcfce7' };
            default: return { border: '#d9d9d9', text: '#595959', bgBadge: '#f5f5f5' };
        }
    };

    const colores = getColors(alerta.criticidad);

    return (
        <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e8e8e8',
            borderLeft: `6px solid ${colores.border}`,
            borderRadius: '4px',
            padding: '16px',
            marginBottom: '14px',
            fontFamily: 'Segoe UI, Roboto, sans-serif',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, fontSize: '1.05em', color: '#141414', fontWeight: '600' }}>
                    <span style={{ color: '#8c8c8c', fontSize: '0.85em', marginRight: '8px', fontFamily: 'monospace' }}>[SYS_ALERT]</span>
                    {alerta.tipo}
                </h3>
                <span style={{
                    padding: '3px 8px',
                    borderRadius: '2px',
                    backgroundColor: colores.bgBadge,
                    color: colores.text,
                    fontWeight: '700',
                    fontSize: '0.7em',
                    letterSpacing: '0.5px'
                }}>
                    {alerta.criticidad.toUpperCase()}
                </span>
            </div>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '0.88em', color: '#434343' }}>
                <div>
                    <span style={{ color: '#8c8c8c' }}>SRC_IP: </span>
                    <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace', color: '#0050b3', fontWeight: '600' }}>
                        {alerta.ip_origen}
                    </code>
                </div>
                <div>
                    <span style={{ color: '#8c8c8c' }}>TIMESTAMP: </span>
                    <span style={{ fontWeight: '500', fontFamily: 'monospace' }}>{alerta.timestamp}</span>
                </div>
            </div>

            {/* Fila Inferior: Estado y Botón de Eliminar */}
            <div style={{
                borderTop: '1px solid #f0f0f0',
                paddingTop: '8px',
                marginTop: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Botón para Eliminar (CRUD: Delete) */}
                <button
                    onClick={() => onEliminar(alerta.id)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff4d4f',
                        cursor: 'pointer',
                        fontSize: '0.82em',
                        fontWeight: '600',
                        padding: '2px 4px',
                        fontFamily: 'monospace'
                    }}
                >
                    [DESCARTAR_ALERTA]
                </button>

                <span style={{
                    fontSize: '0.78em',
                    fontWeight: '600',
                    color: alerta.estado === 'Pendiente' ? '#fa8c16' : alerta.estado === 'En Revisión' ? '#1890ff' : '#52c41a',
                    backgroundColor: '#fafafa',
                    padding: '2px 8px',
                    borderRadius: '2px',
                    border: '1px solid #f0f0f0',
                    textTransform: 'uppercase',
                    fontFamily: 'monospace'
                }}>
                    STATUS: {alerta.estado}
                </span>
            </div>
        </div>
    );
});

AlertCard.displayName = 'AlertCard';

export default AlertCard;