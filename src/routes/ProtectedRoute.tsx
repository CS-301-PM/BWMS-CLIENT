import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = [],
}) => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute - user:", user, "loading:", loading);

  // Show loading state while checking authentication
  if (loading) {
    console.log("ProtectedRoute - showing loading state");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3">Checking authentication...</span>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    console.log("ProtectedRoute - no user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (requiredRole.length > 0 && !requiredRole.includes(user.role)) {
    console.log("ProtectedRoute - role mismatch, redirecting to unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("ProtectedRoute - access granted");
  return <>{children}</>;
};
