// src/pages/EditarQuarto.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import api from "../api/api";
import "./styles/cadastrarquartos.css";
import "../pages/styles/home.css";
import logo from "../assets/logomarca(1).png";

export default function EditarQuarto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dados, setDados] = useState({
    numero: "",
    capacidade: "",
    tipo: "Standard",
    preco_diaria: "",
    status: "disponível",
    recursos: "",
    imagem_url: "",
  });

  const [imagemFile, setImagemFile] = useState(null);
  const [preview, setPreview] = useState("");

  // Função para aplicar a classe 'active' dinamicamente
  const getLinkClass = ({ isActive }) => (isActive ? "link-item active" : "link-item");

  // ====== FUNÇÃO DE LOGOUT PADRÃO ======
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get(`/quartos/${id}`);
        setDados(res.data);
        setPreview(res.data.imagem_url || "");
      } catch (err) {
        console.error("Erro ao carregar quarto:", err);
      }
    }
    carregar();
  }, [id]);

  function handleChange(e) {
    setDados({ ...dados, [e.target.name]: e.target.value });
  }

  function handleImagemChange(e) {
    const file = e.target.files?.[0];
    setImagemFile(file || null);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(dados.imagem_url);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("numero", dados.numero);
      formData.append("capacidade", dados.capacidade);
      formData.append("tipo", dados.tipo);
      formData.append("preco_diaria", dados.preco_diaria);
      formData.append("status", dados.status);
      formData.append("recursos", dados.recursos);

      if (imagemFile) {
        formData.append("imagem", imagemFile);
      }

      await api.put(`/quartos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Quarto atualizado com sucesso!");
      navigate("/quartos");
    } catch (err) {
      console.error("Erro ao editar quarto:", err);
      alert("Erro ao editar quarto.");
    }
  }

  return (
    <div className="dashboard-container">
      {/* 1. MENU LATERAL - PADRÃO */}
      <aside className="sidebar">
        <img src={logo} alt="Logo do Hotel" className="logo-img" />
        <nav>
          <ul>
            {/* Links que devem ter CORRESPONDÊNCIA EXATA (`end`) */}
            <li>
              <NavLink to="/" className={getLinkClass} end>
                Início
              </NavLink>
            </li>

            <li>
              <NavLink to="/quartos" className={getLinkClass} end>
                Quartos
              </NavLink>
            </li>

            {/* Links que são SUB-ROTAS (sem `end`) */}
            <li>
              <NavLink to="/quartos/cadastrar" className={getLinkClass}>
                Cadastrar Quarto
              </NavLink>
            </li>

            {/* Hóspedes: Adicionamos `end` */}
            <li>
              <NavLink to="/hospedes" className={getLinkClass} end>
                Hóspedes
              </NavLink>
            </li>

            {/* Cadastrar Hóspede: Agora, este será o único ativo em /hospedes/cadastrar */}
            <li>
              <NavLink to="/hospedes/cadastrar" className={getLinkClass}>
                Cadastrar Hóspede
              </NavLink>
            </li>

            {/* Reservas: Adicionamos `end` */}
            <li>
              <NavLink to="/reservas" className={getLinkClass} end>
                Reservas
              </NavLink>
            </li>

            {/* Cadastrar Reserva: Agora, este será o único ativo em /reservas/cadastrar */}
            <li>
              <NavLink to="/reservas/cadastrar" className={getLinkClass}>
                Cadastrar Reserva
              </NavLink>
            </li>

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
          <h1>Editar Quarto</h1>
          <p className="subtitle">Atualize as informações do quarto selecionado.</p>
        </header>

        <form onSubmit={handleSubmit} className="form-layout">
          <div className="fields">

            <div className="row">
              <div className="field">
                <label htmlFor="numero">Número</label>
                <input
                  id="numero"
                  name="numero"
                  type="number"
                  value={dados.numero}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="capacidade">Capacidade</label>
                <input
                  id="capacidade"
                  name="capacidade"
                  type="number"
                  value={dados.capacidade}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="tipo">Tipo</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={dados.tipo}
                  onChange={handleChange}
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
                <label htmlFor="preco_diaria">Preço da diária</label>
                <div className="currency">
                  <span className="currency-symbol">R$</span>
                  <input
                    id="preco_diaria"
                    name="preco_diaria"
                    type="number"
                    value={dados.preco_diaria}
                    onChange={handleChange}
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={dados.status}
                  onChange={handleChange}
                >
                  <option value="disponível">Disponível</option>
                  <option value="ocupado">Ocupado</option>
                  <option value="manutenção">Manutenção</option>
                </select>
              </div>
            </div>

            {/* IMAGEM */}
            <div className="field full-width">
              <label htmlFor="imagem">Imagem do quarto</label>
              <input
                id="imagem"
                type="file"
                accept="image/*"
                onChange={handleImagemChange}
              />

              {preview && (
                <div style={{ marginTop: 10 }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxWidth: "260px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              )}
            </div>

            {/* RECURSOS */}
            <div className="field full-width">
              <label htmlFor="recursos">Recursos</label>
              <textarea
                id="recursos"
                name="recursos"
                value={dados.recursos}
                onChange={handleChange}
                placeholder="Descrição, recursos, comodidades..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn add">Salvar Alterações</button>
          </div>
        </form>
      </main>
    </div>
  );
}