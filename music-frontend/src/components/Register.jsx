import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    
    if (!name || !email || !password || !passwordConfirmation) {
      setErr("Please fill in all fields.");
      return;
    }
    if (password !== passwordConfirmation) {
      setErr("Passwords do not match.");
      return;
    }

    try {
      const data = await register(name, email, password, passwordConfirmation);

      
      if (!data?.token) {
        throw new Error("Register failed: No token received.");
      }

      localStorage.setItem("token", data.token);
      nav("/");
    } catch (e) {
      setErr(e.message || "Register failed");
    }
  }

  return (
    <div className="container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit} className="card">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />

        <label htmlFor="password_confirmation">Repeat Password</label>
        <input
          id="password_confirmation"
          name="password_confirmation"
          className="input"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
          minLength={8}
        />

        <button className="btn" type="submit">
          Create Account
        </button>

        {err && <div className="error">{err}</div>}

        <div className="smallMuted" style={{ marginTop: 10 }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}