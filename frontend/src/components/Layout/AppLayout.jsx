import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setShowSidebar(false);
  }, [location.pathname]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      {/* Mobile Header */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, height: 60,
          background: "var(--bg-surface)", borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", padding: "0 20px", zIndex: 100,
          justifyContent: "space-between"
        }}>
          <span style={{ fontWeight: 700, color: "#fff" }}>LabBitácora</span>
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 24, padding: 0 }}
          >
            {showSidebar ? "✕" : "☰"}
          </button>
        </div>
      )}

      {/* Sidebar - Position fixed on mobile */}
      {( (!isMobile) || (isMobile && showSidebar) ) && (
        <div style={isMobile ? {
          position: "fixed", top: 60, left: 0, bottom: 0, right: 0,
          zIndex: 90, display: "flex"
        } : { display: "flex", flexShrink: 0 }}>
          <Sidebar />
          {isMobile && (
            <div 
              onClick={() => setShowSidebar(false)}
              style={{ flex: 1, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }} 
            />
          )}
        </div>
      )}

      <main style={{ 
        flex: 1, 
        padding: isMobile ? "90px 20px 40px" : "36px 44px 44px", 
        maxWidth: 1200, 
        margin: "0 auto",
        width: "100%",
        overflowX: "hidden"
      }}>
        <Outlet />
      </main>
    </div>
  );
}
