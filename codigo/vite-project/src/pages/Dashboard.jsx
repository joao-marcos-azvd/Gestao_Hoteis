// import "./styles/dashboard.css";

import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="page">
      <section className="hero">
        <h2 className="hero-title">Dashboard - Sistema de Hotéis</h2>
      </section>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>🛏️ Bem-vindo ao Sistema de Gestão!</h1>
        <p>Gerencie quartos, hóspedes e reservas.</p>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/quartos" className="btn" style={{ 
            background: '#A17857', color: 'white', padding: '12px 24px', 
            borderRadius: '8px', textDecoration: 'none', margin: '0 1rem', 
            fontWeight: 'bold' 
          }}>
            Ver Quartos
          </Link>
          <Link to="/hospedes" className="btn" style={{ 
            background: '#C19D7E', color: 'white', padding: '12px 24px', 
            borderRadius: '8px', textDecoration: 'none', margin: '0 1rem' 
          }}>
            Ver Hóspedes
          </Link>
        </div>
      </div>
    </div>
  );
}
