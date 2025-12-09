// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import CadastrarQuartos from "./pages/CadastrarQuartos";
import EditarQuarto from "./pages/EditarQuarto";
import ListarQuartos from "./pages/ListarQuartos";

import Hospedes from "./pages/Hospedes";
import CadastrarHospede from "./pages/CadastrarHospede";
import EditarHospede from "./pages/EditarHospede";

import ListarReservas from "./pages/ListarReservas";
import CadastrarReserva from "./pages/CadastrarReserva";
import EditarReserva from "./pages/EditarReserva";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* home */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

        {/* quartos */}
        <Route path="/quartos" element={<ProtectedRoute><ListarQuartos /></ProtectedRoute>} />
        <Route path="/quartos/cadastrar" element={<ProtectedRoute><CadastrarQuartos /></ProtectedRoute>} />
        <Route path="/quartos/editar/:id" element={<ProtectedRoute><EditarQuarto /></ProtectedRoute>} />

        {/* hospedes */}
        <Route path="/hospedes" element={<ProtectedRoute><Hospedes /></ProtectedRoute>} />
        <Route path="/hospedes/cadastrar" element={<ProtectedRoute><CadastrarHospede /></ProtectedRoute>} />
        <Route path="/hospedes/editar/:id" element={<ProtectedRoute><EditarHospede /></ProtectedRoute>} />

        {/* reservas */}
        <Route path="/reservas" element={<ProtectedRoute><ListarReservas /></ProtectedRoute>} />
        <Route path="/reservas/cadastrar" element={<ProtectedRoute><CadastrarReserva /></ProtectedRoute>} />
        <Route path="/reservas/editar/:id" element={<ProtectedRoute><EditarReserva /></ProtectedRoute>} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
