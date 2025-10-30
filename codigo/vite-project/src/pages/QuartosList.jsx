import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function QuartosList() {
  const [quartos, setQuartos] = useState([]);
  useEffect(()=> {
    api.get("/quartos/quartos").then(r=> setQuartos(r.data)).catch(()=> setQuartos([]));
  }, []);
  return (
    <div style={{maxWidth:900, margin:"2rem auto"}}>
      <h2>Quartos</h2>
      <ul>{quartos.map(q=> <li key={q.id}>{q.numero || q.id} - {q.descricao || "-"}</li>)}</ul>
    </div>
  );
}
