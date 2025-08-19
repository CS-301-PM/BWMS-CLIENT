import React from "react";
import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Logged in as: {user?.email} ({user?.role})
          </p>
          <div className="space-y-3">
            <button
              onClick={handleGoBack}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Go Back
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
