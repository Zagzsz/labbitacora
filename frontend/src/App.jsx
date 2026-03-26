import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppLayout from "./components/Layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Practicas from "./pages/Practicas";
import PracticaNueva from "./pages/PracticaNueva";
import PracticaDetalle from "./pages/PracticaDetalle";
import PracticaEditar from "./pages/PracticaEditar";
import Archivos from "./pages/Archivos";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminUsers from "./pages/AdminUsers";
import Proyectos from "./pages/Proyectos";
import PublicPractica from "./pages/PublicPractica";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--bg-root)", color: "var(--text-muted)", fontSize: 13,
      }}>
        Cargando...
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/forgot-password" element={user ? <Navigate to="/" replace /> : <ForgotPassword />} />
        <Route path="/public/:id" element={<PublicPractica />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/practicas" element={<Practicas />} />
          <Route path="/practicas/nueva" element={<PracticaNueva />} />
          <Route path="/practicas/:id" element={<PracticaDetalle />} />
          <Route path="/practicas/:id/editar" element={<PracticaEditar />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/archivos" element={<Archivos />} />
          {user?.is_admin && <Route path="/admin/usuarios" element={<AdminUsers />} />}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
