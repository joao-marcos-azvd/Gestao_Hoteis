// src/pages/EditarHospede.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import api from "../api/api";
import "./styles/cadastrarhospede.css";
import logo from "../assets/logomarca(1).png";

export default function EditarHospede() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  const getLinkClass = ({ isActive }) =>
    isActive ? "link-item active" : "link-item";

  // ====== FUNÇÃO DE LOGOUT PADRÃO ======
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/hospede/${id}`);
        setForm(res.data);
      } catch (err) {
        alert("Erro ao carregar hóspede");
      }
    }
    load();
  }, [id]);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    try {
      await api.put(`/hospede/${id}`, form);
      alert("Hóspede atualizado com sucesso!");
      navigate("/hospedes");
    } catch (err) {
      alert("Erro ao atualizar hóspede");
    }
  }

  if (!form) return <div className="loading-text">Carregando...</div>;

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
          <h1>Editar Hóspede</h1>
          <p className="subtitle">Atualize os dados do hóspede selecionado.</p>
        </header>

        <form onSubmit={submit} className="form-layout">
          <div className="fields">
            <div className="row">
              <div className="field">
                <label htmlFor="nome">Nome Completo</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={form.nome}
                  onChange={change}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="cpf">CPF</label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={form.cpf}
                  onChange={change}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label htmlFor="telefone">Telefone</label>
                <input
                  id="telefone"
                  name="telefone"
                  type="text"
                  value={form.telefone || ""}
                  onChange={change}
                />
              </div>

              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email || ""}
                  onChange={change}
                />
              </div>
            </div>

            <div className="field full-width">
              <label htmlFor="endereco" className="label-full">
                Endereço Completo
              </label>
              <textarea
                id="endereco"
                name="endereco"
                value={form.endereco || ""}
                onChange={change}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn add">
              Salvar Alterações
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}