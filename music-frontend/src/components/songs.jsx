import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000/api";

export default function Songs() {
  const token = localStorage.getItem("token");

  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [me, setMe] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    artist_id: "",
    genre: "",
    duration_seconds: "",
    notes: "",
  });
   

  //Fetching data 
  async function fetchSongs() {
    const headers = { Accept: "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API}/songs`, { headers });
    if (!res.ok) throw new Error("Failed to load songs");

    const data = await res.json();
    setSongs(data);
  }

  async function fetchArtists() {
    const res = await fetch(`${API}/artists`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to load artists");

    const data = await res.json();
    setArtists(data);
  }

  async function fetchMe() {
    if (!token) return;

    const res = await fetch(`${API}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      setMe(data);
    } else {
      
      setMe(null);
    }
  }
  async function toggleLike(songId) {
    try {
      const res = await fetch(`${API}/songs/${songId}/like`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error(`Like failed: ${res.status}`);
  
      const data = await res.json(); // { liked, likes_count }
  
      setSongs((prev) =>
        prev.map((s) =>
          s.id === songId
            ? { ...s, liked_by_me: data.liked, likes_count: data.likes_count }
            : s
        )
      );
    } catch (e) {
      console.error(e);
      alert(e.message || "Like failed");
    }
  }

  useEffect(() => {
    async function init() {
      try {
        setError("");
        setLoading(true);
        await Promise.all([fetchSongs(), fetchArtists(), fetchMe()]);
      } catch (e) {
        setError(e.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    init();
   
  }, []);

  //Create song form
  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("You must be logged in to create songs.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      artist_id: Number(form.artist_id),
      genre: form.genre.trim() || null,
      duration_seconds: form.duration_seconds ? Number(form.duration_seconds) : null,
      notes: form.notes.trim() || null,
    };

    const res = await fetch(`${API}/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError("Failed to create song. Check required fields.");
      return;
    }

    setForm({
      title: "",
      artist_id: "",
      genre: "",
      duration_seconds: "",
      notes: "",
    });

    await fetchSongs();
    setShowForm(false);
  }

  async function deleteSong(id) {
    if (!token) return alert("Login first.");

    const res = await fetch(`${API}/songs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      alert("Delete failed (maybe you are not the owner/admin).");
      return;
    }

    await fetchSongs();
  }

  return (
    <div className="songsPage">
      {/* HEADER */}
      <div className="card">
        <div className="songsHeaderRow">
          <div className="songsHeader">
            <h1>Songs</h1>
            <p className="muted">Create and manage songs.</p>
          </div>

          <button
            type="button"
            className="primaryBtn"
            onClick={() => {
              setError("");
              setShowForm((v) => !v);
            }}
          >
            {showForm ? "Close" : "+ Add Song"}
          </button>
        </div>

        {error && (
          <p className="errorText" style={{ marginTop: 10 }}>
            {error}
          </p>
        )}
      </div>

      {/* ALL SONGS */}
      <div className="card songsListCard">
        <h2 className="sectionTitle">All Songs</h2>

        {loading && <p className="muted">Loading songs...</p>}

        {!loading && songs.length === 0 && (
          <p className="muted">No songs yet. Click “+ Add Song” to create one.</p>
        )}

        {!loading && songs.length > 0 && (
          <div className="songsGrid">
            {songs.map((song) => {
              const canDelete =
                me && (song.user_id === me.id || me.is_admin === true);

              return (
                <div key={song.id} className="songItem">
                  <div className="songTop">
                    <div>
                      <div className="songTitle">{song.title}</div>

                      <div className="songMeta">
                        <span className="pill">
                          Artist: {song.artist?.name ?? "—"}
                        </span>
                        <span className="pill">Genre: {song.genre ?? "—"}</span>
                        <span className="pill">
                          Duration: {song.duration_seconds
                            ? `${song.duration_seconds}s`
                            : "—"}
                        </span>
                      </div>
                    </div>




                    
                                    <button
                  type="button"
                  className="ghostBtn"
                  onClick={() => {
                    console.log("LIKE BUTTON CLICKED", song.id);
                    toggleLike(song.id);
                  }}
                >
                  {song.liked_by_me ? "Liked" : " Like"} ({song.likes_count ?? 0})
                </button>

                    {canDelete && (
                      <button
                        className="dangerBtn"
                        onClick={() => deleteSong(song.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  
                  {song.notes && <div className="songNotes">{song.notes}</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      
      {showForm && (
        <div className="card songsFormCard">
          <h2 className="sectionTitle">Add Song</h2>

          <form onSubmit={handleSubmit} className="songsForm">
            <div className="field">
              <label>Title *</label>
              <input
                name="title"
                placeholder="e.g. Suzanna"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Artist *</label>
              <select
                name="artist_id"
                value={form.artist_id}
                onChange={handleChange}
                required
              >
                <option value="">Select artist</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Genre</label>
              <input
                name="genre"
                placeholder="e.g. Afropop"
                value={form.genre}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Duration (seconds)</label>
              <input
                type="number"
                name="duration_seconds"
                placeholder="e.g. 210"
                value={form.duration_seconds}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div className="field full">
              <label>Notes</label>
              <textarea
                name="notes"
                placeholder="Optional notes..."
                value={form.notes}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="actionsRow">
              <button className="primaryBtn" type="submit">
                Create Song
              </button>

              <button
                className="ghostBtn"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}