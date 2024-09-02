import React, { useEffect } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { user, userAuthentication } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    userAuthentication();
  }, []);

  const handleGoToDashboard = () => {
    navigate("/home");
  };

  const handleProfileSettings = () => {
    navigate("/upload");
  };

  console.log(user);

  return (
    <div className="min-h-screen bg-white-100 dark:bg-white-900 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-white-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          {/* User Avatar or Icon */}
          {user?.avatarUrl ? (
            <img
              className="w-24 h-24 rounded-full mb-4"
              src={user.avatarUrl}
              alt={`${user.username}'s avatar`}
            />
          ) : (
            <svg
              className="w-24 h-24 text-blue-500 dark:text-blue-400 mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 4.8-2.2 4.8-4.8S14.7 2.4 12 2.4 7.2 4.6 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8V21h19.2v-1.6c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          )}

          {/* Greeting Message */}
          <h2 className="text-2xl font-semibold text-black-800 dark:text-black-200 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Name :{" "}
            <span className="text-blue-500 dark:text-blue-400 font-medium">
              {user?.username}
            </span>
          </p>

          <p className="text-gray-600 dark:text-gray-400">
            Email :{" "}
            <span className="text-blue-500 dark:text-blue-400 font-medium">
              {user?.email}
            </span>
          </p>

          <p className="text-gray-600 dark:text-gray-400">
            Phone :{" "}
            <span className="text-blue-500 dark:text-blue-400 font-medium">
              {user?.phone}
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <NavLink to="/home">
            <button
              onClick={handleGoToDashboard}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Go to Dashboard
            </button>
          </NavLink>
          <button
            onClick={handleProfileSettings}
            className="w-full sm:w-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
          >
            Profile Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
