import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import useAuth from "@/domains/auth/stores/auth";

vi.mock("@/domains/auth/stores/auth");

describe("Auth guard component", () => {
  it("redirects to home if authenticated and guardType is guest", () => {
    vi.mocked(useAuth).mockReturnValue(true);

    const { container } = render(
      <MemoryRouter initialEntries={["/guest"]}>
        <Routes>
          <Route element={<AuthGuard guardType="auth" />}>
            <Route path="/" element={<div>Home</div>} />
          </Route>
          <Route element={<AuthGuard guardType="guest" />}>
            <Route path="/guest" element={<div>Page only for guests</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(container.innerHTML).toContain("Home");
  });

  it("redirects to login if not authenticated and guardType is auth", () => {
    vi.mocked(useAuth).mockReturnValue(false);

    const { container } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/login" element={<div>Login</div>} />
          <Route element={<AuthGuard guardType="auth" />}>
            <Route path="/protected" element={<div>Protected</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(container.innerHTML).toContain("Login");
  });

  it("renders the outlet if authenticated and guardType is auth", () => {
    vi.mocked(useAuth).mockReturnValue(true);

    const { container } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route element={<AuthGuard guardType="auth" />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(container.innerHTML).toContain("Protected Content");
  });
});
