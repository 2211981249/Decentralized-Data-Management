import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
// import registerImage from "/src/assets/Register-Image.jpg";
import registerImage from "/src/assets/registerImage.avif";
import { z } from "zod";

// Zod Schema for validation
const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(255, { message: "Username must be less than 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be at least 5 characters" })
    .max(100, { message: "Email must be less than 40 characters" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be exactly 10 digits" })
    .max(10, { message: "Phone number must be exactly 10 digits" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(1, { message: "Password must be at least 5 characters" })
    .max(1024, { message: "Password must be less than 1024 characters" }),
});

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storetokenInLS } = useAuth();

  // Handling input value changes
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handling form submission with Zod validation
  const handleSubmit = async (e) => {
    console.log("Come");
    e.preventDefault();

    console.log(user);
    try {
      // Validate the user data with Zod schema
      const validatedData = signupSchema.parse(user);

      console.log(validatedData);
      // Proceed with API call if validation passes
      const response = await fetch("http://localhost:7000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      const res_data = await response.json();
      console.log("Response from server", res_data);

      if (response.ok) {
        toast.success("Registration Successful");
        storetokenInLS(res_data.token);
        setUser("");
        navigate("/login");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        console.log("Register Error: " + error);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left side image */}
      <div className="lg:w-1/2 w-full">
        <img
          src={registerImage}
          alt="Registration"
          className="object-cover w-full h-full"
          style={{
            marginTop: "7rem",
             height:"30rem",
            borderRadius:"10%",
            
          }}
        />
      </div>
      <ToastContainer />

      {/* Right side form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Create Your Account
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your username"
                  value={user.username}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={user.email}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone No
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your phone number"
                  value={user.phone}
                  onChange={handleInput}
                />
              </div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
