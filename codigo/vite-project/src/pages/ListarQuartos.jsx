// src/pages/ListarQuartos.jsx
import "./styles/listarquartos.css";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function ListarQuartos() {
  const [quartos, setQuartos] = useState([]);
  const navigate = useNavigate();

  async function load() {
    try {
      const res = await api.get("/quartos"); // conforme seu backend
      setQuartos(res.data);
    } catch (err) {
      console.error("Erro ao carregar quartos", err);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id) {
    if (!confirm("Excluir este quarto?")) return;
    try {
      await api.delete(`/quartos/${id}`);
      setQuartos(quartos.filter(q => q.id !== id));
    } catch (err) {
      alert("Erro ao excluir quarto");
    }
  }

  return (
    <>
      <header className="topbar">...{/* seu header JSX */}</header>
      <main className="page">
        <section className="controls">
          <div className="search"><input placeholder="Pesquisar" /></div>
          <button className="btn new" onClick={() => navigate("/quartos/cadastrar")}>+ NOVO</button>
        </section>

        <section className="list">
          {quartos.map((quarto) => (
            <article key={quarto.id} className="card">
              <div className="card-photo">FOTO</div>
              <div className="card-body">
                <h3 className="room-title">Quarto {quarto.numero} – {quarto.tipo}</h3>
                <p className="room-desc">{quarto.recursos || quarto.desc}</p>
                <div className="meta-row">
                  <span className={`badge ${quarto.status}`}>{quarto.status}</span>
                  <div className="price">Preço: <strong>R$ {quarto.preco_diaria}</strong></div>
                </div>

                <div className="card-actions">
                  <div className="icons">
                    <button className="icon" title="Excluir" onClick={() => handleDelete(quarto.id)}>🗑️</button>
                    <button className="icon" title="Editar" onClick={() => navigate(`/quartos/editar/${quarto.id}`)}>✏️</button>
                  </div>
                  <button className="btn outline details">DETALHES</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
