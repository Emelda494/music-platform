import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout as apiLogout, deleteMe as apiDeleteMe } from "../api/auth";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

 
  if (!token) {
    return <div className="authWrapper">{children}</div>;
  }

  const navItems = [
    { to: "/", label: "Dashboard" },
    { to: "/artists", label: "Artists" },
    { to: "/songs", label: "Songs" },
    { to: "/playlists", label: "Playlists" },
    { to: "/artists/new", label: "Add Artist" },
  ];

  
  function isActive(to) {
    if (to === "/") return pathname === "/";
    return pathname === to || pathname.startsWith(to + "/") || pathname.startsWith(to);
  }

  function getTitle() {
    if (pathname === "/") return "Dashboard";
    if (pathname.startsWith("/artists")) return "Artists";
    if (pathname.startsWith("/songs")) return "Songs";
    if (pathname.startsWith("/playlists")) return "Playlists";
    return "Music Platform";
  }
  const NavItem = ({ to, label }) => (
    <Link className={`navItem ${isActive(to) ? "active" : ""}`} to={to}>
      {label}
    </Link>
  );

  async function handleLogout() {
    try {
      await apiLogout();
    } catch (e) {
      
    }
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function handleDeleteAccount() {
    const ok = confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (!ok) return;

    try {
      await apiDeleteMe();
    } catch (e) {
    
    }
    localStorage.removeItem("token");
    navigate("/login"); 
  }

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandLogo">MP</div>
          <div>
            <div className="brandName">Music Platform</div>
            <div className="brandTag">Admin Dashboard</div>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}

          <div className="navDivider" />

          <button type="button" className="btn" onClick={handleLogout}>
            Logout
          </button>

          <button type="button" className="btn danger" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </nav>

        
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbarTitle">{getTitle()}</div>
          <div className="topbarRight">
            <span className="pill">Local</span>
          </div>
        </header>

        <section className="content">{children}</section>
      </main>
    </div>
  );
}