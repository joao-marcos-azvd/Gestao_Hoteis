// src/pages/ListarReservas.jsx
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./styles/reservas.css";   // Agora só esse CSS controla essa página
import logo from "../assets/logomarca(1).png";

export default function ListarReservas() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  const getLinkClass = ({ isActive }) =>
    isActive ? "link-item active" : "link-item";

  // ====== FUNÇÃO DE LOGOUT PADRÃO ======
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  async function carregar() {
    try {
      const r = await api.get("/reservas");
      setReservas(r.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar reservas.");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function deletar(id) {
    if (!confirm("Deseja excluir a reserva?")) return;
    try {
      await api.delete(`/reservas/${id}`);
      carregar();
    } catch (err) {
      alert("Erro ao excluir");
    }
  }

  function formatarData(data) {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
  }

  return (
    <div className="dashboard-container">

      {/* 1. MENU LATERAL - PADRÃO */}
      <aside className="sidebar">
        <img src={logo} alt="Logo do Hotel" className="logo-img" />
        <nav>
          <ul>
            {/* Links que devem ter CORRESPONDÊNCIA EXATA (`end`) */}
            <li><NavLink to="/" className={getLinkClass} end>Início</NavLink></li>

            <li><NavLink to="/quartos" className={getLinkClass} end>Quartos</NavLink></li>
            {/* Links que são SUB-ROTAS (sem `end`) */}
            <li><NavLink to="/quartos/cadastrar" className={getLinkClass}>Cadastrar Quarto</NavLink></li>

            <li><NavLink to="/hospedes" className={getLinkClass} end>Hóspedes</NavLink></li>
            <li><NavLink to="/hospedes/cadastrar" className={getLinkClass}>Cadastrar Hóspede</NavLink></li>

            <li><NavLink to="/reservas" className={getLinkClass} end>Reservas</NavLink></li>
            <li><NavLink to="/reservas/cadastrar" className={getLinkClass}>Cadastrar Reserva</NavLink></li>

            {/* Sair - mantém o mesmo estilo */}
            <li>
              <button
                className="link-item logout-link"
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <main className="content">
        <header className="page-header">
          <h1>Gerenciamento de Reservas</h1>
          <p className="subtitle">Lista completa de todas as reservas registradas.</p>
        </header>

        <div className="controls">
          <button
            className="btn add"
            onClick={() => navigate("/reservas/cadastrar")}
          >
            + Nova Reserva
          </button>
        </div>

        <section className="table-card">
          <table className="guest-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hóspede</th>
                <th>Quarto</th>
                <th>Entrada</th>
                <th>Saída</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {reservas.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.hospede_id}</td>
                  <td>{r.quarto_id}</td>
                  <td>{formatarData(r.data_entrada)}</td>
                  <td>{formatarData(r.data_saida)}</td>

                  <td className="actions-column">
                    <div className="icons">
                      <button
                        className="icon-btn edit"
                        onClick={() => navigate(`/reservas/editar/${r.id}`)}
                      >
                        ✏️
                      </button>

                      <button
                        className="icon-btn delete"
                        onClick={() => deletar(r.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}