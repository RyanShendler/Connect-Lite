import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div
      className="z-100 align-center absolute top-1/2 left-1/2 flex h-1/4 w-1/3 flex-col overflow-hidden rounded-md border border-black bg-gray-50 text-center shadow-md"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className="bg-sky-600 p-6"></div>
      <div className="mt-14 mb-5 shrink self-center">
        <h1 className="font-serif text-3xl text-black">
          Login To Connect-Lite
        </h1>
      </div>
      <div>
        <button
          className="text-l rounded-lg border border-black py-2 px-6 shadow-md"
          onClick={loginWithRedirect}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
