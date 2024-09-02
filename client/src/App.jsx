import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home.jsx";
import Register from "../src/pages/Register.jsx";
import Navbar from "./pages/Navbar.jsx";
import Login from "./pages/Login.jsx";
import { Logout } from "./pages/Logout.jsx";
import UploadDocument from "./pages/UploadDocument.jsx";
import DynamicCardLayout from "./pages/AfterLogin.jsx";
import Upload from "./pages/Upload.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "./store/auth.jsx";
import Footer from "./pages/Footer.jsx";
import Profile from "./pages/Profile.jsx";
import ErrorPage from "./pages/Error.jsx";

const App = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  const [log, setLog] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLog(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={log ? <Navigate to="/home" /> : <Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={log ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/home"
            element={log ? <DynamicCardLayout /> : <Navigate to="/login" />}
          />
          <Route
            path="/upload"
            element={log ? <Upload /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={log ? <Profile /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
