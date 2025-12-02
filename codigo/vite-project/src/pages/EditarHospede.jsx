// src/pages/EditarHospede.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./styles/cadastro.css";

export default function EditarHospede() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/hospede/${id}`);
        setForm(res.data);
      } catch (err) { alert("Erro ao carregar hóspede"); }
    }
    load();
  }, [id]);

  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function submit(e) {
    e.preventDefault();
    try {
      await api.put(`/hospede/${id}`, form);
      alert("Hóspede atualizado");
      navigate("/hospedes");
    } catch (err) { alert("Erro ao atualizar"); }
  }

  if (!form) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Editar Hóspede</h1>
      <form onSubmit={submit}>
        <input name="nome" value={form.nome} onChange={change} />
        <input name="cpf" value={form.cpf} onChange={change} />
        <input name="telefone" value={form.telefone || ""} onChange={change} />
        <input name="email" value={form.email || ""} onChange={change} />
        <textarea name="endereco" value={form.endereco || ""} onChange={change} />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
