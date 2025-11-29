import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
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
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* QUARTOS */}
          <Route path="/quartos" element={<ListarQuartos />} />
          <Route path="/cadastrar-quartos" element={<CadastrarQuartos />} />
          <Route path="/editar-quarto" element={<EditarQuarto />} />
          
          {/* HÓSPEDES */}
          <Route path="/hospedes" element={<Hospedes />} />
          <Route path="/cadastro" element={<Cadastro />} />
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;