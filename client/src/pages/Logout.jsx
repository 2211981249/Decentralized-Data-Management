import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast, ToastContainer } from "react-toastify";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const data = await LogoutUser();
      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 600);
    };

    handleLogout();
  }, []);

  return (
    <>
      <ToastContainer />
    </>
  );
};
