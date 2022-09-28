import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { logout } = useAuth0();

  return (
    <header className="flex fixed inset-x-0 top-0 z-100 justify-between items-center bg-sky-600">
      <div className="pl-4 py-2">
        <Link to="/" className="text-white font-sans font-semibold text-4xl">
          Connect Lite
        </Link>
      </div>
      <div className="pr-6">
        <button
          className="text-white text-lg"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
