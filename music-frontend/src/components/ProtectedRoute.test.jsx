import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

beforeEach(() => {
  localStorage.clear();
});

test("redirects to login if user is not logged in", () => {
  render(
    <MemoryRouter initialEntries={["/artists/new"]}>
      <Routes>
        <Route path="/login" element={<div>LOGIN PAGE</div>} />
        <Route
          path="/artists/new"
          element={
            <ProtectedRoute>
              <div>SECRET PAGE</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );

  
  expect(screen.getByText("LOGIN PAGE")).toBeInTheDocument();
  expect(screen.queryByText("SECRET PAGE")).not.toBeInTheDocument();
});


test("shows protected page if user is logged in", () => {
    localStorage.setItem("token", "TOKEN");
  
    render(
      <MemoryRouter initialEntries={["/artists/new"]}>
        <Routes>
          <Route path="/login" element={<div>LOGIN PAGE</div>} />
          <Route
            path="/artists/new"
            element={
              <ProtectedRoute>
                <div>SECRET PAGE</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );
  
    expect(screen.getByText("SECRET PAGE")).toBeInTheDocument();
    expect(screen.queryByText("LOGIN PAGE")).not.toBeInTheDocument();
  });