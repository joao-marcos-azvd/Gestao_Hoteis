import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ReservasList() {
  const [reservas, setReservas] = useState([]);
  useEffect(()=> {
    api.get("/reservas/reservas").then(r=> setReservas(r.data)).catch(()=> setReservas([]));
  }, []);
  return (
    <div style={{maxWidth:900, margin:"2rem auto"}}>
      <h2>Reservas</h2>
      <ul>{reservas.map(r=> <li key={r.id}>{r.hospede_nome || r.hospede_id} — {r.quarto_numero || r.quarto_id}</li>)}</ul>
    </div>
  );
}
