import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { logout } = useAuth0();

  return (
    <header className="z-100 fixed inset-x-0 top-0 flex items-center justify-between bg-sky-600">
      <div className="py-2 pl-4">
        <Link to="/" className="font-sans text-4xl font-semibold text-white">
          Connect Lite
        </Link>
      </div>
      <div className="pr-6">
        <button
          className="text-lg text-white"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
