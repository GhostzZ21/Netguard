import React, { useState } from 'react';
import mockAlerts from './data/mockAlerts.json';
import AlertCard from './components/AlertCard';

function App() {
  // Estado para almacenar la lista completa de alertas
  const [alertas, setAlertas] = useState(mockAlerts);

  // Estado para controlar el filtro de criticidad seleccionado
  const [filtroCriticidad, setFiltroCriticidad] = useState('Todas');

  // Lógica para filtrar las alertas dinámicamente en la interfaz
  const alertasFiltradas = alertas.filter((alerta) => {
    if (filtroCriticidad === 'Todas') return true;
    return alerta.criticidad === filtroCriticidad;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>

      {/* Encabezado del Dashboard / SOC Lite */}
      <header style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ color: '#1a1a1a', margin: 0 }}>🛡️ NetGuard SOC Lite</h1>
        <p style={{ color: '#666', margin: '5px 0 0 0' }}>Panel de Monitoreo de Alertas de TI — SecurIT Solutions</p>
      </header>

      {/* Sección Interactiva: Filtros (Control de Estado) */}
      <section style={{ marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#444' }}>Filtrar por Criticidad:</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['Todas', 'Alta', 'Media', 'Baja'].map((nivel) => (
            <button
              key={nivel}
              onClick={() => setFiltroCriticidad(nivel)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                fontWeight: '600',
                backgroundColor: filtroCriticidad === nivel ? '#0070f3' : '#fff',
                color: filtroCriticidad === nivel ? '#fff' : '#333',
                transition: 'all 0.2s ease'
              }}
            >
              {nivel}
            </button>
          ))}
        </div>
      </section>

      {/* Sección Dinámica: Lista de Alertas */}
      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ margin: 0, fontSize: '1.4em', color: '#333' }}>Alertas Detectadas</h2>
          <span style={{ color: '#666', fontSize: '0.9em' }}>
            Mostrando <strong>{alertasFiltradas.length}</strong> de {alertas.length} incidentes
          </span>
        </div>

        {alertasFiltradas.length > 0 ? (
          alertasFiltradas.map((alerta) => (
            <AlertCard key={alerta.id} alerta={alerta} />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#999', padding: '20px', border: '1px dashed #ccc', borderRadius: '6px' }}>
            No se encontraron alertas para este filtro.
          </p>
        )}
      </main>

    </div>
  );
}

export default App;