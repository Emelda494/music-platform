import { useEffect, useState } from "react";
import { createArtist, getArtist, updateArtist } from "../api/artists";
import { useNavigate, useParams } from "react-router-dom";

export default function ArtistForm() {
  const { id } = useParams(); // undefined for new
  const nav = useNavigate();

  const [form, setForm] = useState({ name: "", genre: "", bio: "", image_url: "" });
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!id) return;
    getArtist(id)
      .then((data) => setForm({
        name: data.name || "",
        genre: data.genre || "",
        bio: data.bio || "",
        image_url: data.image_url || "",
      }))
      .catch((e) => setErr(e.message));
  }, [id]);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    try {
      if (id) await updateArtist(id, form);
      else await createArtist(form);
      nav("/");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="container">
      <h1>{id ? "Edit Artist" : "New Artist"}</h1>

      <form className="card" onSubmit={handleSubmit}>
        <label>Name *</label>
        <input className="input" value={form.name} onChange={(e) => setField("name", e.target.value)} />

        <label>Genre</label>
        <input className="input" value={form.genre} onChange={(e) => setField("genre", e.target.value)} />

        <label>Bio</label>
        <textarea className="input" rows="4" value={form.bio} onChange={(e) => setField("bio", e.target.value)} />

        <label>Image URL</label>
        <input className="input" value={form.image_url} onChange={(e) => setField("image_url", e.target.value)} />

        <button className="btn" type="submit">{id ? "Update" : "Create"}</button>
        {err && <div className="error">{err}</div>}
      </form>
    </div>
  );
}
