import { apiFetch } from "./client";

export function register(name, email, password, passwordConfirmation) {
  return apiFetch("/api/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation, // IMPORTANT
    }),
  });
}

export function login(email, password) {
  return apiFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return apiFetch("/api/logout", { method: "POST" });
}

export function deleteMe() {
  return apiFetch("/api/me", { method: "DELETE" });
}