import React, { useState, useMemo, useCallback } from 'react';
import mockAlerts from './data/mockAlerts.json';
import AlertCard from './components/AlertCard';

function App() {
  // Estado que almacena la lista de alertas (Base del CRUD)
  const [alertas, setAlertas] = useState(mockAlerts);
  const [filtroCriticidad, setFiltroCriticidad] = useState('Todas');

  // ==========================================
  // FUNCIONES CRUD (Manejo de Estado)
  // ==========================================

  // 1. CREAR / ALMACENAR: Simular inyección de nueva alerta en tiempo real
  const handleAgregarAlerta = useCallback(() => {
    const amenazasSimuladas = [
      { tipo: "Inyección SQL Detectada en API", criticidad: "Alta" },
      { tipo: "Intento de Escalación de Privilegios", criticidad: "Alta" },
      { tipo: "Escaneo de Vulnerabilidades (OpenVAS)", criticidad: "Media" },
      { tipo: "Acceso Excesivo a Endpoints no Autorizados", criticidad: "Media" },
      { tipo: "Conexión Saliente Sospechosa Tor", criticidad: "Baja" }
    ];

    // Seleccionar una amenaza aleatoria
    const seleccionada = amenazasSimuladas[Math.floor(Math.random() * amenazasSimuladas.length)];

    // Generar IP origen aleatoria
    const ipAleatoria = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;

    const nuevaAlerta = {
      id: Date.now().toString(), // ID único basado en tiempo
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      tipo: seleccionada.tipo,
      criticidad: seleccionada.criticidad,
      ip_origen: ipAleatoria,
      estado: "Pendiente"
    };

    // Almacenar en el estado local (updater function para evitar stale closures)
    setAlertas(prev => [nuevaAlerta, ...prev]);
  }, []);

  // 2. ELIMINAR: Remover un registro de la lista por ID (referencia estable con useCallback)
  const handleEliminarAlerta = useCallback((id) => {
    setAlertas(prev => prev.filter(alerta => alerta.id !== id));
  }, []);

  // ==========================================
  // LÓGICA DE FILTRADO Y MÉTRICAS
  // ==========================================
  // Vista derivada memoizada: solo recalcula si cambia el array o el filtro activo
  const alertasFiltradas = useMemo(() => {
    if (filtroCriticidad === 'Todas') return alertas;
    return alertas.filter(alerta => alerta.criticidad === filtroCriticidad);
  }, [alertas, filtroCriticidad]);

  // Métricas KPI memoizadas: solo recalculan cuando el estado base muta
  const metricas = useMemo(() => ({
    total: alertas.length,
    altas: alertas.filter(a => a.criticidad === 'Alta').length,
    medias: alertas.filter(a => a.criticidad === 'Media').length,
    bajas: alertas.filter(a => a.criticidad === 'Baja').length,
  }), [alertas]);

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      backgroundColor: '#f0f2f5',
      color: '#000000',
      margin: 0,
      boxSizing: 'border-box'
    }}>

      {/* 1. SIDEBAR CORPORATIVO */}
      <aside style={{
        width: '260px',
        minWidth: '260px',
        backgroundColor: '#001529',
        color: '#ffffff',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto'
      }}>
        <div style={{ marginBottom: '32px', textAlign: 'center', borderBottom: '1px solid #002140', paddingBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '1.2em', fontWeight: '700', letterSpacing: '1.5px', color: '#fff' }}>
            NETGUARD SOC
          </h2>
          <span style={{ fontSize: '0.7em', color: '#40a9ff', fontWeight: '700', letterSpacing: '0.5px' }}>INTELLIGENCE PLATFORM</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
          <div style={{
            padding: '12px 16px',
            borderRadius: '4px',
            backgroundColor: '#1890ff',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '0.9em'
          }}>
            [#] Monitor de Incidentes
          </div>
          <div style={{ padding: '12px 16px', color: '#595959', cursor: 'not-allowed', fontSize: '0.9em' }}>
            [-] Ajustes del Sistema
          </div>
          <div style={{ padding: '12px 16px', color: '#595959', cursor: 'not-allowed', fontSize: '0.9em' }}>
            [-] Registro de Auditoría
          </div>
        </nav>

        <div style={{ borderTop: '1px solid #002140', paddingTop: '16px', fontSize: '0.75em', color: '#8c8c8c', textAlign: 'center', fontFamily: 'monospace' }}>
          OPERATOR: SECURE_IT_SOLUTIONS
        </div>
      </aside>

      {/* 2. AREA DE CONTENIDO FULL WIDTH */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>

        {/* Barra Superior */}
        <header style={{
          backgroundColor: '#ffffff',
          padding: '16px 32px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '1.15em', color: '#1f1f1f', fontWeight: '600' }}>
            CONSOLA CENTRAL DE MONITOREO DE TRÁFICO
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* BOTÓN DE ACCIÓN CRUD: CREAR INFORMACIÓN */}
            <button
              onClick={handleAgregarAlerta}
              style={{
                backgroundColor: '#bd10e0',
                color: '#fff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '2px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.8em',
                fontFamily: 'monospace'
              }}
            >
              [+] SIMULAR_INCIDENTE
            </button>

            <span style={{ fontSize: '0.75em', backgroundColor: '#f5f5f5', border: '1px solid #d9d9d9', padding: '4px 12px', borderRadius: '2px', color: '#237804', fontWeight: '700', fontFamily: 'monospace' }}>
              SYS_STATUS: ONLINE
            </span>
          </div>
        </header>

        {/* Zona del Dashboard principal */}
        <main style={{ padding: '32px', width: '100%', boxSizing: 'border-box' }}>

          {/* METRICAS (Se recalculan solas al mutar el estado) */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', width: '100%' }}>
            <div style={{ flex: 1, backgroundColor: '#fff', padding: '16px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', borderTop: '4px solid #1890ff' }}>
              <div style={{ fontSize: '0.75em', color: '#8c8c8c', fontWeight: '600', letterSpacing: '0.5px' }}>TOTAL INCIDENTES</div>
              <div style={{ fontSize: '1.8em', fontWeight: '700', marginTop: '4px', color: '#262626', fontFamily: 'monospace' }}>{metricas.total}</div>
            </div>

            <div style={{ flex: 1, backgroundColor: '#fff', padding: '16px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', borderTop: '4px solid #ff4d4f' }}>
              <div style={{ fontSize: '0.75em', color: '#ff4d4f', fontWeight: '700', letterSpacing: '0.5px' }}>SEVERIDAD ALTA</div>
              <div style={{ fontSize: '1.8em', fontWeight: '700', marginTop: '4px', color: '#262626', fontFamily: 'monospace' }}>{metricas.altas}</div>
            </div>

            <div style={{ flex: 1, backgroundColor: '#fff', padding: '16px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', borderTop: '4px solid #faad14' }}>
              <div style={{ fontSize: '0.75em', color: '#92400e', fontWeight: '700', letterSpacing: '0.5px' }}>SEVERIDAD MEDIA</div>
              <div style={{ fontSize: '1.8em', fontWeight: '700', marginTop: '4px', color: '#262626', fontFamily: 'monospace' }}>{metricas.medias}</div>
            </div>

            <div style={{ flex: 1, backgroundColor: '#fff', padding: '16px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', borderTop: '4px solid #52c41a' }}>
              <div style={{ fontSize: '0.75em', color: '#52c41a', fontWeight: '700', letterSpacing: '0.5px' }}>SEVERIDAD BAJA</div>
              <div style={{ fontSize: '1.8em', fontWeight: '700', marginTop: '4px', color: '#262626', fontFamily: 'monospace' }}>{metricas.bajas}</div>
            </div>
          </div>

          {/* FILTROS */}
          <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '4px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', border: '1px solid #e8e8e8' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#595959', fontSize: '0.8em', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>
              Filtro Operacional de Red
            </h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Todas', 'Alta', 'Media', 'Baja'].map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => setFiltroCriticidad(nivel)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '2px',
                    border: filtroCriticidad === nivel ? '1px solid #1890ff' : '1px solid #d9d9d9',
                    cursor: 'pointer',
                    fontSize: '0.85em',
                    fontWeight: '600',
                    backgroundColor: filtroCriticidad === nivel ? '#e6f7ff' : '#ffffff',
                    color: filtroCriticidad === nivel ? '#1890ff' : '#262626',
                    transition: 'all 0.1s ease',
                    textTransform: 'uppercase'
                  }}
                >
                  {nivel === 'Todas' ? 'Ver Todo' : `LOG_CRIT: ${nivel}`}
                </button>
              ))}
            </div>
          </section>

          {/* LISTA */}
          <section style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05em', color: '#262626', fontWeight: '600' }}>
                REGISTROS FILTRADOS EN MONITOR
              </h3>
              <span style={{ fontSize: '0.8em', color: '#8c8c8c', fontFamily: 'monospace' }}>
                EVENTS_COUNT: {alertasFiltradas.length}
              </span>
            </div>

            <div style={{ width: '100%' }}>
              {alertasFiltradas.length > 0 ? (
                alertasFiltradas.map((alerta) => (
                  <AlertCard
                    key={alerta.id}
                    alerta={alerta}
                    onEliminar={handleEliminarAlerta} // Pasando función por props (CRUD: Delete)
                  />
                ))
              ) : (
                <div style={{ backgroundColor: '#fff', textAlign: 'center', color: '#8c8c8c', padding: '40px', borderRadius: '4px', border: '1px dashed #d9d9d9', fontFamily: 'monospace', fontSize: '0.9em' }}>
                  NO_EVENTS_FOUND_FOR_SPECIFIED_CRITERIA
                </div>
              )}
            </div>
          </section>

        </main>
      </div>

    </div>
  );
}

export default App;