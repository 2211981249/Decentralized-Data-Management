import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import loginImage from "/src/assets/Login-image.jpg";
import React from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storetokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        toast.success("Login Successful");
        const res_data = await response.json();
        console.log(res_data)
        storetokenInLS(res_data.token);
        localStorage.setItem("email",res_data.email)
        setUser({ email: "", password: "" });
        setTimeout(() => {
          navigate("/home");
          window.location.reload();
        }, 800);
      } else {
        toast.error("Invalid Email and Password");
      }
    } catch (error) {
      console.log("Login Error" + error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <ToastContainer />
      {/* Left side image */}
      <div className="lg:w-1/2 w-full">
        <img
          src={loginImage}
          alt="Registration"
          className="object-cover w-full h-full"
          style={{
            marginTop: "3rem",
            marginRight: "5rem",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Right side form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Login Here
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={user.email}
                  onChange={handleInput}
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Signup Link */}
          <p className="mt-2 text-center text-sm text-gray-600">
            You don't have an account?{" "}
            <NavLink
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
