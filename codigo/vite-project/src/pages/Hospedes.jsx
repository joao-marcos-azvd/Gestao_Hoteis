// src/pages/Hospedes.jsx
import "./styles/hospedes.css";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Hospedes() {
  const [hospedes, setHospedes] = useState([]);
  const navigate = useNavigate();

  async function load() {
    try {
      const res = await api.get("/hospede/hospedes");
      setHospedes(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id) {
    if (!confirm("Remover hóspede?")) return;
    try {
      await api.delete(`/hospede/${id}`);
      setHospedes(hospedes.filter(h => h.id !== id));
    } catch (err) {
      alert("Erro ao remover hóspede");
    }
  }

  return (
    <>
      <header className="topbar">...{/* seu header */}</header>
      <main className="page">
        <section className="controls">
          <div className="search"><input placeholder="Pesquisar" /></div>
          <div className="actions-right">
            <button className="btn filter" onClick={() => navigate("/hospedes/cadastrar")}>Novo Hóspede</button>
          </div>
        </section>

        <section className="table-card">
          <table className="guest-table">
            <thead>...{/* seu cabeçalho */}</thead>
            <tbody>
              {hospedes.map(h => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>{h.nome}</td>
                  <td>{h.cpf}</td>
                  <td>{h.telefone}</td>
                  <td>{h.email}</td>
                  <td>{h.endereco}</td>
                  <td className="icons">
                    <button onClick={() => navigate(`/hospedes/editar/${h.id}`)}>✏️</button>
                    <button onClick={() => handleDelete(h.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
