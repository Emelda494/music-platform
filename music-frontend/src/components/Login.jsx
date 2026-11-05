import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
  
    
    if (!email.trim() || !password.trim()) {
      setErr("Please enter email and password.");
      return;
    }
  
    try {
      const data = await login(email, password);
  
      
      if (!data?.token) {
        throw new Error("Login failed: No token received.");
      }
  
      localStorage.setItem("token", data.token);
      nav("/");
    } catch (e) {
      localStorage.removeItem("token"); 
      setErr(e.message);
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="card">
        <label>Email</label>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" type="submit">
          Login
        </button>

        {err && <div className="error">{err}</div>}
      </form>
    </div>
  );
}