import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {
  const [mode, setMode] = useState("login");

  return (
    <div className="authCard">
      <div className="authTabs">
        <button
          className={mode === "login" ? "activeTab" : ""}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          className={mode === "register" ? "activeTab" : ""}
          onClick={() => setMode("register")}
        >
          Register
        </button>
      </div>

      <div className="authContent">
        {mode === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}