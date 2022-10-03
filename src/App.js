import { useAuth0, User } from "@auth0/auth0-react";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import SkillListing from "./SkillListing";
import "./style.css";

const App = () => {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }
  if (isAuthenticated) {
    //this is the main app
    return (
      <StrictMode>
        <div className="flex h-screen w-screen flex-col bg-gray-200">
          <BrowserRouter>
            <Header />
            <div className="mt-12">
              <Routes>
                <Route path="/admin" element={<SkillListing />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </StrictMode>
    );
  } else {
    //this is the login screen
    return (
      <StrictMode>
        <div className="h-screen w-screen bg-gray-200">
          <Login />
        </div>
      </StrictMode>
    );
  }
};

export default App;
