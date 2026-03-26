import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const NAV = [
  { section: "Menú Principal", items: [
    { icon: "▦", label: "Dashboard", to: "/" },
    { icon: "+", label: "Nueva práctica", to: "/practicas/nueva" },
  ]},
  { section: "Investigación", items: [
    { icon: "⊞", label: "Mis prácticas", to: "/practicas" },
    { icon: "📄", label: "Archivos", to: "/archivos" },
  ]},
  { section: "Administración", adminOnly: true, items: [
    { icon: "👥", label: "Usuarios", to: "/admin/usuarios" },
  ]},
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside style={{
      width: 250, height: "100%", background: "var(--bg-sidebar)", borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column", padding: "24px 16px", flexShrink: 0,
      backdropFilter: "blur(10px)", overflowY: "auto"
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 12px", marginBottom: 36 }}>
        <div style={{
          width: 32, height: 32, background: "var(--bg-elevated)", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 15px var(--accent-glow)",
        }}>
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <rect width="6" height="6" rx="2" fill="var(--accent)"/>
            <rect x="8" width="6" height="6" rx="2" fill="var(--accent)" opacity="0.4"/>
            <rect y="8" width="6" height="6" rx="2" fill="var(--accent)" opacity="0.4"/>
            <rect x="8" y="8" width="6" height="6" rx="2" fill="var(--accent)" opacity="0.2"/>
          </svg>
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>
          LabBitácora
        </span>
      </div>

      {/* Nav sections */}
      {NAV.filter(s => !s.adminOnly || user?.is_admin).map((section) => (
        <div key={section.section} style={{ marginBottom: 28 }}>
          <p style={{
            fontSize: 11, color: "var(--text-faint)", fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0 12px", marginBottom: 12,
          }}>
            {section.section}
          </p>
          {section.items.map((item) => (
            <NavLink key={item.label} to={item.to} end style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <motion.div
                   whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.03)" }}
                   transition={{ duration: 0.15 }}
                   style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 14px", borderRadius: 12, fontSize: 13,
                    color: isActive ? "#fff" : "var(--text-muted)",
                    background: isActive ? "var(--bg-elevated)" : "transparent",
                    boxShadow: isActive ? "inset 0 0 0 1px rgba(255,255,255,0.05)" : "none",
                    cursor: "pointer", transition: "all 0.2s",
                    marginBottom: 4,
                  }}
                >
                  <span style={{ 
                    fontSize: 16, 
                    color: isActive ? "var(--accent)" : "inherit",
                    opacity: isActive ? 1 : 0.6 
                  }}>
                    {item.icon}
                  </span>
                  <span style={{ fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
      ))}

      {/* Profile/Footer */}
      <div style={{ marginTop: "auto", paddingTop: 20 }}>
        <div
          onClick={handleLogout}
          className="glass"
          style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px",
            cursor: "pointer", borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
            fontWeight: 700, fontSize: 14, textTransform: "uppercase"
          }}>
            {user?.username?.charAt(0) || "U"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.username || "Investigador"}
            </p>
            <p style={{ fontSize: 11, color: "var(--text-faint)" }}>Cerrar sesión</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

