import React from "react";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "../contexts/UserContext.tsx";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
