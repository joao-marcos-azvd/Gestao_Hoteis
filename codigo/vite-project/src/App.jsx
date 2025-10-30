import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QuartosList from "./pages/Quartoslist";
import HospedesList from "./pages/HospedesList";
import ReservasList from "./pages/ReservasList";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/quartos" element={<ProtectedRoute><QuartosList /></ProtectedRoute>} />
      <Route path="/hospedes" element={<ProtectedRoute><HospedesList /></ProtectedRoute>} />
      <Route path="/reservas" element={<ProtectedRoute><ReservasList /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
