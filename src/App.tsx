// // src/App.tsx
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import MainApp from "./components/MainApp";
// import LoginForm from "./components/auth/login-form";
// import UnauthorizedPage from "../pages/UnauthorizedPage";
// import { AuthProvider, useAuth } from "../contexts/auth-context";
// import { ProtectedRoute } from "./routes/ProtectedRoute";
// import "./App.css";
// import "../styles/globals.css";
// import DebugAuth from "./components/DebugAuth"; // Temporary

// // Helper component for role-based redirection
// const RoleBasedRedirect = () => {
//   const { user } = useAuth();
//   console.log("RoleBasedRedirect - user:", user);

//   switch (user?.role) {
//     case "admin":
//       return <Navigate to="/admin" replace />;
//     case "manager":
//       return <Navigate to="/manager" replace />;
//     case "staff-central":
//       return <Navigate to="/warehouse" replace />;
//     case "staff-department":
//       return <Navigate to="/department" replace />;
//     case "supplier":
//       return <Navigate to="/supplier" replace />;
//     default:
//       console.log("RoleBasedRedirect - no valid role, going to login");
//       return <Navigate to="/login" replace />;
//   }
// };

// const LoginPageWrapper = () => {
//   const { login, loading, error } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (credentials: {
//     username: string;
//     password: string;
//   }) => {
//     try {
//       await login(credentials);
//       // After successful login, the RoleBasedRedirect will handle navigation
//       // based on the user's role. You don't need to navigate manually here.
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const handleSwitchToRegister = () => {
//     console.log("Switch to register clicked");
//     // If you have a register page, you can navigate to it:
//     // navigate('/register');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
//       <LoginForm
//         onLogin={handleLogin}
//         onSwitchToRegister={handleSwitchToRegister}
//         loading={loading}
//         error={error}
//       />
//     </div>
//   );
// };

// function AppContent() {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Temporary debug - remove after fixing */}
//       <DebugAuth />

//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<LoginPageWrapper />} />
//         <Route path="/unauthorized" element={<UnauthorizedPage />} />

//         {/* Protected main app route */}
//         <Route
//           path="/*"
//           element={
//             <ProtectedRoute>
//               <MainApp />
//             </ProtectedRoute>
//           }
//         />

//         {/* Redirect root */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <RoleBasedRedirect />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

// src/App.tsx (temporary simplified version)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/auth-context";
import TestRender from "./components/TestRender";
import "./App.css";
import "../styles/globals.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 p-8">
          <h1 className="text-2xl font-bold mb-4">CBU Stores - Debug Mode</h1>

          <Routes>
            {/* Test route - always shows */}
            <Route path="/test" element={<TestRender />} />

            {/* Root path also shows test */}
            <Route path="/" element={<TestRender />} />

            {/* Catch all - also shows test */}
            <Route path="*" element={<TestRender />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
