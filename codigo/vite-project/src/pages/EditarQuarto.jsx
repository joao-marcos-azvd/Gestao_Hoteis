// src/pages/EditarQuarto.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import "./styles/editarquartos.css";

export default function EditarQuarto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/quartos/${id}`);

        // normalização dos dados recebidos
        setDados({
          ...res.data,
          numero: res.data.numero ?? "",
          capacidade: res.data.capacidade ?? "",
          preco_diaria: res.data.preco_diaria ?? "",
          tipo: res.data.tipo ?? "Standard",
          status: res.data.status ?? "disponível",
          recursos: res.data.recursos ?? "",
          imagem_url: res.data.imagem_url ?? null
        });

      } catch (err) {
        alert("Erro ao carregar quarto");
        navigate("/quartos");
      }
    }
    load();
  }, [id, navigate]);

  function handleChange(e) {
    setDados({ ...dados, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/quartos/${id}`, {
        ...dados,
        numero: Number(dados.numero),
        capacidade: Number(dados.capacidade),
        preco_diaria: Number(dados.preco_diaria)
      });

      alert("Quarto alterado com sucesso!");
      navigate("/quartos");

    } catch (err) {
      alert(
        "Erro ao alterar quarto: " +
          (err.response?.data?.detail || err.message)
      );
    }
  }

  if (!dados) {
    return <div className="page">Carregando...</div>;
  }

  return (
    <>
      {/* Topbar */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="logo">Checkin • Painel</div>
          <nav className="nav">
            <Link to="/">Início</Link>
            <Link to="/quartos">Quartos</Link>
            <Link to="/quartos/cadastrar">Novo Quarto</Link>
          </nav>
        </div>
      </header>

      {/* Página */}
      <main className="page">
        <section className="hero">
          <h1 className="hero-title">Editar Quarto #{dados.numero}</h1>
        </section>

        <section className="form-card">
          <div className="form-grid">

            {/* Foto */}
            <div className="photo-box">
              <div className="photo-inner">
                <span className="photo-text">FOTO ATUAL</span>

                {dados.imagem_url ? (
                  <img
                    src={dados.imagem_url}
                    alt={`Quarto ${dados.numero}`}
                  />
                ) : (
                  <span>Sem imagem cadastrada</span>
                )}

              </div>
            </div>

            {/* Formulário */}
            <form className="fields" onSubmit={handleSubmit}>
              
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
                  <label htmlFor="capacidade">Capacidade Máxima</label>
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
                  <label htmlFor="tipo">Tipo de Quarto</label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={dados.tipo}
                    onChange={handleChange}
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
                <div className="field">
                  <label htmlFor="preco_diaria">Preço da Diária</label>
                  <div className="currency">
                    <span className="currency-symbol">R$</span>
                    <input
                      id="preco_diaria"
                      name="preco_diaria"
                      type="number"
                      step="0.01"
                      value={dados.preco_diaria}
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
                    value={dados.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="disponível">Disponível</option>
                    <option value="ocupado">Ocupado</option>
                    <option value="manutenção">Em Manutenção</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="recursos" className="label-full">
                  Recursos e Descrição
                </label>
                <textarea
                  id="recursos"
                  name="recursos"
                  value={dados.recursos}
                  onChange={handleChange}
                  placeholder="Ex: Cama king size, TV 50', frigobar, vista para o mar."
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn outline small"
                  onClick={() => navigate("/quartos")}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn add">
                  Salvar Alterações
                </button>
              </div>
            </form>

          </div>
        </section>
      </main>
    </>
  );
}
