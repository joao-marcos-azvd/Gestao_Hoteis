import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Inicial from "./pages/Inicial";           // ⬅ novo nome
import ListarQuartos from "./pages/ListarQuartos";
import Hospedes from "./pages/Hospedes";
import CadastrarQuartos from "./pages/CadastrarQuartos";
import EditarQuarto from "./pages/EditarQuarto";
import Cadastro from "./pages/Cadastro";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* se quer que a primeira página seja a Inicial */}
          <Route path="/" element={<Inicial />} />

          {/* se ainda quiser manter login em outra rota */}
          <Route path="/login" element={<Login />} />
          <Route path="/inicial" element={<Inicial />} />

          {/* QUARTOS */}
          <Route path="/quartos" element={<ListarQuartos />} />
          <Route path="/cadastrar-quartos" element={<CadastrarQuartos />} />
          <Route path="/editar-quarto" element={<EditarQuarto />} />

          {/* HÓSPEDES */}
          <Route path="/hospedes" element={<Hospedes />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* qualquer rota desconhecida volta para Inicial */}
          <Route path="*" element={<Navigate to="/inicial" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
