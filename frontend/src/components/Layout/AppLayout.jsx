import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "36px 44px 44px", maxWidth: 900, overflow: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
