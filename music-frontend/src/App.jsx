import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Auth from "./components/Auth";
import Artists from "./components/Artists";
import ArtistForm from "./components/ArtistForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Songs from "./components/songs";

function PublicOnly({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public */}
          <Route
            path="/login"
            element={
              <PublicOnly>
                <Auth />
              </PublicOnly>
            }
          />

          {/* Protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/artists"
            element={
              <ProtectedRoute>
                <Artists />
              </ProtectedRoute>
            }
          />

          <Route
          path="/songs"
          element={
            <ProtectedRoute>
              <Songs />
            </ProtectedRoute>
          }
        />

          <Route
            path="/playlists"
            element={
              <ProtectedRoute>
                <div className="card">
                  <h1>Playlists</h1>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/artists/new"
            element={
              <ProtectedRoute>
                <ArtistForm mode="create" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/artists/:id/edit"
            element={
              <ProtectedRoute>
                <ArtistForm mode="edit" />
              </ProtectedRoute>
            }
          />

          {/* Default fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}