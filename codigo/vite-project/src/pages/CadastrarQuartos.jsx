// src/pages/CadastrarQuartos.jsx
import { useState } from "react";
import api from "../api/api";
import { useNavigate, NavLink } from "react-router-dom";
import "./styles/cadastrarquartos.css";
import "../pages/styles/home.css"; // garante estilo igual do menu
import logo from "../assets/logomarca(1).png";

export default function CadastrarQuartos() {
  const [dados, setDados] = useState({
    numero: "",
    capacidade: "",
    tipo: "Standard",
    preco_diaria: "",
    status: "disponível",
    recursos: "",
  });

  const [imagemFile, setImagemFile] = useState(null);
  const [imagemPreview, setImagemPreview] = useState("");

  const navigate = useNavigate();

  // ====== FUNÇÃO PADRÃO PARA LINKS DO MENU ======
  const getLinkClass = ({ isActive }) =>
    isActive ? "link-item active" : "link-item";

  // ====== FUNÇÃO DE LOGOUT PADRÃO ======
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  function handleChange(e) {
    setDados({ ...dados, [e.target.name]: e.target.value });
  }

  function handleImagemChange(e) {
    const file = e.target.files?.[0];
    setImagemFile(file || null);

    if (file) {
      const url = URL.createObjectURL(file);
      setImagemPreview(url);
    } else {
      setImagemPreview("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("numero", String(Number(dados.numero)));
      formData.append("capacidade", String(Number(dados.capacidade)));
      formData.append("preco_diaria", String(Number(dados.preco_diaria)));
      formData.append("tipo", dados.tipo);
      formData.append("status", dados.status);
      formData.append("recursos", dados.recursos || "");

      if (imagemFile) {
        formData.append("imagem", imagemFile);
      }

      await api.post("/quartos/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Quarto cadastrado com sucesso!");
      navigate("/quartos");
    } catch (err) {
      alert(
        "Erro ao cadastrar quarto: " +
          (err.response?.data?.detail || err.message)
      );
    }
  }

  return (
    <div className="dashboard-container">
      {/* ========== MENU LATERAL PADRÃO ========== */}
      <aside className="sidebar">
        <img src={logo} alt="Logo do Hotel" className="logo-img" />

        <nav>
          <ul>
            <li>
              <NavLink to="/" end className={getLinkClass}>
                Início
              </NavLink>
            </li>

            {/* Quartos */}
            <li>
              <NavLink to="/quartos" end className={getLinkClass}>
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
              <NavLink to="/hospedes" end className={getLinkClass}>
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
              <NavLink to="/reservas" end className={getLinkClass}>
                Reservas
              </NavLink>
            </li>

            <li>
              <NavLink to="/reservas/cadastrar" className={getLinkClass}>
                Cadastrar Reserva
              </NavLink>
            </li>

            {/* Sair */}
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

      {/* ========== CONTEÚDO PRINCIPAL ========== */}
      <main className="content">
        <header className="page-header">
          <h1>Cadastro de Novo Quarto</h1>
          <p className="subtitle">
            Insira as informações básicas, capacidade, tipo, recursos e a foto do
            quarto.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="form-layout">
          {/* Campos Principais */}
          <div className="fields">
            <div className="row">
              <div className="field">
                <label htmlFor="numero">Número</label>
                <input
                  id="numero"
                  name="numero"
                  type="number"
                  placeholder="Ex: 1"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="capacidade">Capacidade Máxima</label>
                <input
                  id="capacidade"
                  name="capacidade"
                  type="number"
                  placeholder="Ex: 2"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="tipo">Tipo de Quarto</label>
                <select
                  id="tipo"
                  name="tipo"
                  onChange={handleChange}
                  value={dados.tipo}
                  required
                >
                  <option value="Standard">Standard</option>
                  <option value="Duplo">Duplo</option>
                  <option value="Suíte Executiva">Suíte Executiva</option>
                  <option value="Suíte Master">Suíte Master</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="field currency-field">
                <label htmlFor="preco_diaria">Preço da Diária</label>
                <div className="currency">
                  <span className="currency-symbol">R$</span>
                  <input
                    id="preco_diaria"
                    name="preco_diaria"
                    type="number"
                    placeholder="Ex: 250.00"
                    step="0.01"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="status">Status Atual</label>
                <select
                  id="status"
                  name="status"
                  onChange={handleChange}
                  value={dados.status}
                  required
                >
                  <option value="disponível">Disponível</option>
                  <option value="ocupado">Ocupado</option>
                  <option value="manutenção">Em Manutenção</option>
                </select>
              </div>
            </div>

            <div className="field full-width">
              <label htmlFor="imagem">Carregue a imagem do quarto</label>
              <input
                id="imagem"
                name="imagem"
                type="file"
                accept="image/*"
                onChange={handleImagemChange}
              />

              {imagemFile && (
                <p style={{ marginTop: 6, fontSize: "0.85rem" }}>
                  Arquivo selecionado: {imagemFile.name}
                </p>
              )}

              {imagemPreview && (
                <div style={{ marginTop: 10 }}>
                  <img
                    src={imagemPreview}
                    alt="Pré-visualização do quarto"
                    style={{
                      maxWidth: "260px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="field full-width">
              <label htmlFor="recursos">Recursos e Descrição (Opcional)</label>
              <textarea
                id="recursos"
                name="recursos"
                placeholder="Ex: Cama king size, TV 50', frigobar, vista para o mar."
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn add">
              Salvar Quarto
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}