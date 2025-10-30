import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function HospedesList() {
  const [hospedes, setHospedes] = useState([]);
  useEffect(()=> {
    api.get("/hospedes/hospedes").then(r=> setHospedes(r.data)).catch(()=> setHospedes([]));
  }, []);
  return (
    <div style={{maxWidth:900, margin:"2rem auto"}}>
      <h2>Hóspedes</h2>
      <ul>{hospedes.map(h=> <li key={h.id}>{h.nome || h.id} - {h.email || "-"}</li>)}</ul>
    </div>
  );
}
