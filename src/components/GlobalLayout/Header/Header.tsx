import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { routes } from "@/router";

const Header = () => {
  return (
    <div className="border-b">
      <div className="container flex items-center justify-between p-4">
        <Link to={routes.home}>Contacts App</Link>
        <Button asChild>
          <Link to={routes.contact()}>+ Add Contact</Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
