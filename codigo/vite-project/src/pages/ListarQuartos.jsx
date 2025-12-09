// Updated ListarQuartos.jsx with full menu including logout
import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import api from "../api/api";
import "./styles/listarquartos.css";
import logo from "../assets/logomarca(1).png";

const API_BASE = api.defaults.baseURL || "";

export default function ListarQuartos() {
  const [quartos, setQuartos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getLinkClass = ({ isActive }) =>
    isActive ? "link-item active" : "link-item";

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  async function load() {
    try {
      const res = await api.get("/quartos");
      setQuartos(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Erro ao carregar quartos", err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleSearch(e) {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const results = quartos.filter((q) =>
      q.numero.toString().includes(value) ||
      q.tipo?.toLowerCase().includes(value) ||
      q.status?.toLowerCase().includes(value) ||
      q.recursos?.toLowerCase().includes(value)
    );

    setFiltered(results);
  }

  async function handleDelete(id) {
    if (!confirm("Excluir este quarto?")) return;

    try {
      await api.delete(`/quartos/${id}`);
      const updated = quartos.filter((q) => q.id !== id);
      setQuartos(updated);
      setFiltered(updated);
    } catch (err) {
      alert("Erro ao excluir quarto");
    }
  }

  return (
    <div className="dashboard-container">

      {/* MENU LATERAL COMPLETO */}
      <aside className="sidebar">
        <img src={logo} alt="Logo do Hotel" className="logo-img" />

        <nav>
          <ul>
            {/* Início */}
            <li>
              <NavLink to="/" className={getLinkClass}>
                Início
              </NavLink>
            </li>

            {/* Quartos */}
            <li>
              <NavLink to="/quartos" className={getLinkClass}>
                Quartos
              </NavLink>
            </li>

            <li>
              <NavLink to="/quartos/cadastrar" className={getLinkClass}>
                Cadastrar Quarto
              </NavLink>
            </li>

            {/* Hóspedes */}
            <li>
              <NavLink to="/hospedes" className={getLinkClass}>
                Hóspedes
              </NavLink>
            </li>

            <li>
              <NavLink to="/hospedes/cadastrar" className={getLinkClass}>
                Cadastrar Hóspede
              </NavLink>
            </li>

            {/* Reservas */}
            <li>
              <NavLink to="/reservas" className={getLinkClass}>
                Reservas
              </NavLink>
            </li>

            <li>
              <NavLink to="/reservas/cadastrar" className={getLinkClass}>
                Cadastrar Reserva
              </NavLink>
            </li>

            {/* SAIR */}
            <li>
              <button
                className="link-item logout-link"
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="content">
        <h1>Quartos do Hotel</h1>
        <p className="subtitle">
          Gerencie a disponibilidade, detalhes e cadastro dos quartos.
        </p>

        <section className="controls">
          <div className="search with-icon">
            <input
              placeholder="Pesquisar por número, tipo, status ou recursos..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <button
            className="btn add"
            onClick={() => navigate("/quartos/cadastrar")}
          >
            + NOVO QUARTO
          </button>
        </section>

        <section className="list">
          {filtered.length === 0 ? (
            <p className="empty-state">Nenhum quarto encontrado.</p>
          ) : (
            filtered.map((quarto) => (
              <article key={quarto.id} className="quarto-card">

                {quarto.imagem_url && (
                  <div className="quarto-image-wrapper">
                    <img
                      src={`${API_BASE}${quarto.imagem_url}`}
                      alt={`Quarto ${quarto.numero}`}
                      className="quarto-image"
                    />
                  </div>
                )}

                <div className="quarto-body">
                  <div className="quarto-header">
                    <h3 className="room-title">Quarto {quarto.numero}</h3>
                    <span className="room-type-tag">{quarto.tipo || "Padrão"}</span>
                  </div>

                  <p className="room-desc">
                    {quarto.recursos || "Nenhuma descrição ou recurso fornecido."}
                  </p>

                  <div className="quarto-footer">
                    <div className="meta-row">
                      <span className={`badge ${quarto.status?.toLowerCase()}`}>
                        {quarto.status || "Indefinido"}
                      </span>

                      <div className="price-display">
                        <span>Diária</span>
                        <strong>
                          R$ {quarto.preco_diaria?.toFixed(2) || "0.00"}
                        </strong>
                      </div>
                    </div>

                    <div className="quarto-actions">
                      <div className="icons">
                        <button
                          className="icon"
                          title="Excluir"
                          onClick={() => handleDelete(quarto.id)}
                        >
                          🗑️
                        </button>

                        <button
                          className="icon"
                          title="Editar"
                          onClick={() => navigate(`/quartos/editar/${quarto.id}`)}
                        >
                          ✏️
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </article>
            ))
          )}
        </section>

      </main>
    </div>
  );
}
