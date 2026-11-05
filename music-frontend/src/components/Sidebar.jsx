import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiMusic, FiList } from "react-icons/fi";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">🎵 MP</h2>

      <nav>
        <NavLink to="/" className="navItem">
          <FiHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/artists" className="navItem">
          <FiUser />
          <span>Artists</span>
        </NavLink>

        <NavLink to="/songs" className="navItem">
          <FiMusic />
          <span>Songs</span>
        </NavLink>

        <NavLink to="/playlists" className="navItem">
          <FiList />
          <span>Playlists</span>
        </NavLink>
      </nav>
    </div>
  );
}