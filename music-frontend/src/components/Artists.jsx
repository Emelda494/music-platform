import { useEffect, useState } from "react";
import { getArtists, deleteArtist } from "../api/artists";
import { Link } from "react-router-dom";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [err, setErr] = useState("");

  const token = localStorage.getItem("token");

  async function load() {
    setErr("");
    try {
      const data = await getArtists();
      setArtists(data);
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id) {
    try {
      await deleteArtist(id);
      load();
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="container">
      <div className="topbar">
        <h1>Artists</h1>
        <div className="btnRow">
          {token && <Link className="btn" to="/artists/new">+ New Artist</Link>}
          {!token && <Link className="btn" to="/login">Login</Link>}
        </div>
      </div>

      {err && <div className="error">{err}</div>}

      <div className="grid">
        {artists.map((a) => (
          <div className="card" key={a.id}>
            <h3>{a.name}</h3>
            <div className="muted">{a.genre || "No genre"}</div>
            <p className="muted">{a.bio || "No bio"}</p>

            {token && (
              <div className="btnRow">
                <Link className="btn" to={`/artists/${a.id}/edit`}>Edit</Link>
                <button className="btn" onClick={() => handleDelete(a.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}