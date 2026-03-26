import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { motion } from "framer-motion";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/auth/users");
      setUsers(res.data);
    } catch (err) {
      setError("No se pudo cargar la lista de usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (userId) => {
    if (!window.confirm("¿Estás seguro de desactivar a este usuario? No podrá iniciar sesión.")) return;
    try {
      await api.patch(`/auth/users/${userId}/deactivate`);
      fetchUsers(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.detail || "Error al desactivar usuario");
    }
  };

  const handleActivate = async (userId) => {
    if (!window.confirm("¿Deseas activar manualmente a este usuario?")) return;
    try {
      await api.patch(`/auth/users/${userId}/activate`);
      fetchUsers(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.detail || "Error al activar usuario");
    }
  };

  if (loading) return <div className="text-center py-20 text-[var(--text-muted)]">Cargando usuarios...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Gestión de Usuarios</h1>
        <p className="text-[13px] text-[var(--text-muted)]">Administra el acceso y roles de la plataforma</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-elevated)]/30">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-[var(--text-faint)]">Usuario</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-[var(--text-faint)]">Email</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-[var(--text-faint)]">Estado</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-[var(--text-faint)]">Rol</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-[var(--text-faint)] text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[var(--bg-elevated)]/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold text-xs">
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{u.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      u.is_active 
                        ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {u.is_active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[var(--text-muted)]">
                      {u.is_admin ? "Administrador" : "Usuario"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      {!u.is_active && (
                        <button 
                          onClick={() => handleActivate(u.id)}
                          className="text-[11px] font-bold text-green-400 hover:text-green-300 transition-colors uppercase"
                        >
                          Activar
                        </button>
                      )}
                      {u.id !== currentUser?.id && u.is_active && (
                        <button 
                          onClick={() => handleDeactivate(u.id)}
                          className="text-[11px] font-bold text-red-400 hover:text-red-300 transition-colors uppercase"
                        >
                          Desactivar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
