// src/layouts/MainLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Sidebar } from "../components/sidebar"; // Use named import with curly braces
import DebugAuth from "../components/DebugAuth"; // Import DebugAuth component

const MainLayout: React.FC = () => {
  const [activePage, setActivePage] = React.useState("dashboard");

  const handlePageChange = (page: string) => {
    setActivePage(page);
    // You might want to add navigation logic here
    console.log("Navigating to:", page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      // In your MainLayout or AppContent
      <DebugAuth />
      <Header />
      <div className="flex">
        <Sidebar activePage={activePage} onPageChange={handlePageChange} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
