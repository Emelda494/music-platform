import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="card">
        <p>Choose a section:</p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
          <Link className="btn" to="/artists">Artists</Link>
          <Link className="btn" to="/songs"> Songs</Link>
          <Link className="btn" to="/playlists">Playlists</Link>
        </div>
      </div>
    </div>
  );
}