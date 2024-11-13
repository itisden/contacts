import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "@/domains/auth/stores/auth";

const AuthGuard = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const location = useLocation();
  console.log("location", location);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
