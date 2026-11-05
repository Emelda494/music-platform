import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import * as authApi from "../api/auth";

jest.mock("../api/auth");

function renderLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test("renders login heading and button", () => {
  renderLogin();
  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});

test("shows error message when login fails", async () => {
  authApi.login.mockRejectedValue(new Error("Invalid credentials"));

  renderLogin();

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "wrong@test.com" },
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "wrongpass" },
  });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
});

test("stores token in localStorage when login succeeds", async () => {
  authApi.login.mockResolvedValue({ token: "TEST_TOKEN_123" });

  renderLogin();

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "admin@test.com" },
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(localStorage.getItem("token")).toBe("TEST_TOKEN_123");
  });
});


test("calls login API with email and password", async () => {
    authApi.login.mockResolvedValue({ token: "X" });
  
    renderLogin();
  
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "admin@test.com" },
    });
  
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
  
    await waitFor(() => {
      expect(authApi.login).toHaveBeenCalledWith("admin@test.com", "password123");
    });
  });