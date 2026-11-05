import { apiFetch } from "./client";

export function getArtists() {
  return apiFetch("/api/artists");
}

export function getArtist(id) {
  return apiFetch(`/api/artists/${id}`);
}

export function createArtist(payload) {
  return apiFetch("/api/artists", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateArtist(id, payload) {
  return apiFetch(`/api/artists/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteArtist(id) {
  return apiFetch(`/api/artists/${id}`, { method: "DELETE" });
}