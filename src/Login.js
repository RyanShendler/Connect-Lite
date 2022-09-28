import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div
      className="flex flex-col absolute z-100 text-center top-1/2 left-1/2 border border-black rounded-md bg-gray-50 shadow-md w-1/3 h-1/4 align-center overflow-hidden"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className="bg-sky-600 p-6"></div>
      <div className="self-center mt-14 mb-5 shrink">
        <h1 className="text-black font-serif text-3xl">
          Login To Connect-Lite
        </h1>
      </div>
      <div>
        <button
          className="text-l py-2 px-6 border border-black rounded-lg shadow-md"
          onClick={loginWithRedirect}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
