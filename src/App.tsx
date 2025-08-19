// import { BrowserRouter as Router } from "react-router-dom";
// import MainApp from "./components/MainApp";
// import "./App.css";
// import "../styles/globals.css";

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//         <MainApp />
//       </div>
//     </Router>
//   );
// }

// export default App;

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

import MainApp from "./components/MainApp";
import Login from "./components/auth/LoginForm";
import Registration from "./components/auth/UserRegistration";
import "./App.css";

import { useUserContext } from "../hooks/UserContextHook";
import { StockManagementProvider } from "../contexts/StockManagementContext";
import { RequestManagementProvider } from "../contexts/RequestContext";

function App() {
  const { user } = useUserContext();
  const hasAdmin = user?.hasAdmin ?? false;
  const isLoggedIn = !!user?.user;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Login route */}
        <Route
          path="/login"
          element={
            hasAdmin ? (
              !isLoggedIn ? (
                <Login />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/register" replace />
            )
          }
        />

        {/* Registration route */}
        <Route
          path="/register"
          element={
            !hasAdmin ? <Registration /> : <Navigate to="/login" replace />
          }
        />

        {/* Root route */}
        <Route
          path="/"
          element={
            hasAdmin ? (
              isLoggedIn ? (
                <div className="min-h-screen bg-gray-50">
                  <StockManagementProvider>
                    <RequestManagementProvider>
                      <MainApp />
                    </RequestManagementProvider>
                  </StockManagementProvider>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/register" replace />
            )
          }
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
