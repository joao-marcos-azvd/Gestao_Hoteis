import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

// Dashboard.jsx
// Coloque este arquivo em: frontend/src/pages/Dashboard.jsx
// Dependências esperadas: api (src/services/api.js), react-router-dom, Tailwind (recommended)

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ quartos: 0, hospedes: 0, reservas: 0 });
  const [recentReservas, setRecentReservas] = useState([]);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  })();

  useEffect(() => {
    let mounted = true;
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        // buscar listas (os endpoints podem variar conforme seu backend)
        const [qRes, hRes, rRes] = await Promise.all([
          api.get("/quartos/quartos"),
          api.get("/hospedes/hospedes"),
          api.get("/reservas/reservas"),
        ]);

        if (!mounted) return;

        const quartosList = Array.isArray(qRes.data) ? qRes.data : [];
        const hospedesList = Array.isArray(hRes.data) ? hRes.data : [];
        const reservasList = Array.isArray(rRes.data) ? rRes.data : [];

        setCounts({ quartos: quartosList.length, hospedes: hospedesList.length, reservas: reservasList.length });

        // ordenar reservas por data (se existir campo data_checkin / created_at)
        const sorted = reservasList.slice().sort((a, b) => {
          const da = new Date(a.data_checkin || a.data || a.created_at || a.id || 0);
          const db = new Date(b.data_checkin || b.data || b.created_at || b.id || 0);
          return db - da;
        });

        setRecentReservas(sorted.slice(0, 5));
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.detail || err.message || "Erro ao carregar dados");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchAll();
    return () => (mounted = false);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold">Painel de Controle</h1>
          <p className="text-sm text-gray-600">Bem-vindo{user?.nome ? `, ${user.nome}` : ""} — visão geral rápida</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/quartos" className="px-3 py-2 bg-white rounded-lg shadow-sm text-sm">Ver Quartos</Link>
          <button onClick={handleLogout} className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm">Sair</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-10">Carregando dados...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">{error}</div>
        ) : (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white rounded-2xl shadow flex flex-col">
                <span className="text-sm uppercase text-gray-500">Quartos</span>
                <span className="text-3xl font-bold mt-2">{counts.quartos}</span>
                <p className="text-xs text-gray-500 mt-2">Total de quartos cadastrados</p>
                <div className="mt-4">
                  <Link to="/quartos" className="text-sm underline">Gerenciar quartos →</Link>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl shadow flex flex-col">
                <span className="text-sm uppercase text-gray-500">Hóspedes</span>
                <span className="text-3xl font-bold mt-2">{counts.hospedes}</span>
                <p className="text-xs text-gray-500 mt-2">Total de hóspedes cadastrados</p>
                <div className="mt-4">
                  <Link to="/hospedes" className="text-sm underline">Gerenciar hóspedes →</Link>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl shadow flex flex-col">
                <span className="text-sm uppercase text-gray-500">Reservas</span>
                <span className="text-3xl font-bold mt-2">{counts.reservas}</span>
                <p className="text-xs text-gray-500 mt-2">Reservas ativas / criadas</p>
                <div className="mt-4">
                  <Link to="/reservas" className="text-sm underline">Gerenciar reservas →</Link>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Reservas recentes</h2>
                <Link to="/reservas" className="text-sm underline">Ver todas</Link>
              </div>

              {recentReservas.length === 0 ? (
                <div className="text-gray-500">Nenhuma reserva encontrada.</div>
              ) : (
                <div className="space-y-3">
                  {recentReservas.map((r) => (
                    <div key={r.id || `${r.hospede_id}-${r.quarto_id}-${Math.random()}`} className="p-3 border rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-medium">{r.hospede_nome || r.hospede || `Hóspede #${r.hospede_id || "-"}`}</div>
                        <div className="text-sm text-gray-500">Quarto: {r.quarto_numero || r.quarto || r.quarto_id || "—"}</div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>{(r.data_checkin || r.data || r.created_at) ? new Date(r.data_checkin || r.data || r.created_at).toLocaleString() : "—"}</div>
                        <div className="mt-1">Status: {r.status || r.estado || "—"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        <footer className="text-xs text-gray-400 text-center mt-8">Sistema - painel rápido. Ajuste endpoints em <code>src/services/api.js</code> se necessário.</footer>
      </main>
    </div>
  );
}
