// src/pages/EditarQuarto.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./styles/cadastrarquartos.css";

export default function EditarQuarto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/quartos/${id}`);
        setDados(res.data);
      } catch (err) {
        alert("Erro ao carregar quarto");
      }
    }
    load();
  }, [id]);

  function handleChange(e) { setDados({ ...dados, [e.target.name]: e.target.value }); }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/quartos/${id}`, dados);
      alert("Quarto alterado");
      navigate("/quartos");
    } catch (err) {
      alert("Erro ao alterar quarto");
    }
  }

  if (!dados) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Editar Quarto</h1>
      <form onSubmit={handleSubmit}>
        <input name="numero" value={dados.numero} onChange={handleChange} />
        <input name="capacidade" value={dados.capacidade || ""} onChange={handleChange} />
        <input name="tipo" value={dados.tipo || ""} onChange={handleChange} />
        <input name="preco_diaria" value={dados.preco_diaria || ""} onChange={handleChange} />
        <input name="recursos" value={dados.recursos || ""} onChange={handleChange} />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
