// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li><Link to="/quartos">Listar Quartos</Link></li>
        <li><Link to="/quartos/cadastrar">Cadastrar Quarto</Link></li>
        <li><Link to="/hospedes">Hóspedes</Link></li>
        <li><Link to="/hospedes/cadastrar">Cadastrar Hóspede</Link></li>
        <li><Link to="/planos">Planos</Link></li>
      </ul>
    </div>
  );
}
