import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "@/domains/auth/stores/auth";

interface AuthGuardProps {
  guardType: "auth" | "guest";
}

const AuthGuard = ({ guardType }: AuthGuardProps) => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const location = useLocation();

  if (guardType === "guest" && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (guardType === "auth" && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
