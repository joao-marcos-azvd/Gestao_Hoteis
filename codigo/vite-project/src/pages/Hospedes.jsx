// src/pages/Hospedes.jsx (com busca + ícone de lupa + filtro funcionando)
import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, NavLink } from "react-router-dom";
import "./styles/hospedes.css";
import logo from "../assets/logomarca(1).png";

export default function Hospedes() {
  const [hospedes, setHospedes] = useState([]);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  const getLinkClass = ({ isActive }) => (isActive ? "link-item active" : "link-item");

  async function load() {
    try {
      const res = await api.get("/hospede/hospedes");
      setHospedes(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Remover hóspede?")) return;
    try {
      await api.delete(`/hospede/${id}`);
      setHospedes(hospedes.filter((h) => h.id !== id));
    } catch (err) {
      alert("Erro ao remover hóspede");
    }
  }

  const listaFiltrada = hospedes.filter((h) => {
    const termo = busca.toLowerCase();
    return (
      h.nome.toLowerCase().includes(termo) ||
      h.cpf.toLowerCase().includes(termo) ||
      h.email.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <img src={logo} alt="Logo do Hotel" className="logo-img" />
        <nav>
          <ul>
            <li><NavLink to="/" className={getLinkClass} end>Início</NavLink></li>
            <li><NavLink to="/quartos" className={getLinkClass} end>Quartos</NavLink></li>
            <li><NavLink to="/quartos/cadastrar" className={getLinkClass}>Cadastrar Quarto</NavLink></li>
            <li><NavLink to="/hospedes" className={getLinkClass} end>Hóspedes</NavLink></li>
            <li><NavLink to="/hospedes/cadastrar" className={getLinkClass}>Cadastrar Hóspede</NavLink></li>
            
          </ul>
        </nav>
      </aside>

      <main className="content">
        <header className="page-header">
          <h1>Gerenciamento de Hóspedes</h1>
          <p className="subtitle">Lista completa de todos os hóspedes cadastrados no sistema.</p>
        </header>

        <section className="controls">
          <div className="search search-icon">
      
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar por nome, CPF ou e-mail..."
            />
          </div>

          <div className="actions-right">
            <button className="btn add" onClick={() => navigate("/hospedes/cadastrar")}>
              + Novo Hóspede
            </button>
          </div>
        </section>

        <section className="table-card">
          <table className="guest-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Endereço</th>
                <th >Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map((h) => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>{h.nome}</td>
                  <td>{h.cpf}</td>
                  <td>{h.telefone}</td>
                  <td>{h.email}</td>
                  <td>{h.endereco}</td>
                  <td>
                    <button className="icon-btn edit" onClick={() => navigate(`/hospedes/editar/${h.id}`)}>✏️</button>
                    <button className="icon-btn delete" onClick={() => handleDelete(h.id)}>🗑️</button>
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