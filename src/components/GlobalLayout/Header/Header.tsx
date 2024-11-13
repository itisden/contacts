import { Link } from "react-router-dom";
import useAuth from "@/domains/auth/stores/auth";
import { Button } from "@/components/ui/button";
import { routes } from "@/router";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="border-b">
      <div className="container flex items-center justify-between p-4">
        <Link to={routes.home}>Contacts App</Link>
        {isAuthenticated && (
          <div className="flex space-x-4">
            <Button asChild>
              <Link to={routes.contact()}>+ Add Contact</Link>
            </Button>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
