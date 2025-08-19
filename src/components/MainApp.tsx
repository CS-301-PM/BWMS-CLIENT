"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";

// Admin Pages
import AdminDashboardHome from "../../pages/Admin/AdminDashboardHome";
import UserManagement from "../../pages/Admin/UserManagement";
import SystemSettings from "../../pages/Admin/SystemSettings";
import BlockchainLogs from "../../pages/Admin/BlockchainLogs";

// Manager Pages
import ManagerDashboardHome from "../../pages/Manager/ManagerDashboardHome";
import RequestApproval from "../../pages/Manager/RequestApproval";
import StockOverview from "../../pages/Manager/StockOverview";
import DeliveryOversight from "../../pages/Manager/DeliveryOversight";

// Department Staff Pages
import DepartmentDashboard from "../../pages/DepartmentStaff/DepartmentDashboard";
import RequestHistoryPage from "../../pages/DepartmentStaff/RequestHistoryPage";
import RequestSummaryPage from "../../pages/DepartmentStaff/RequestSummaryPage";

// Supplier Pages
import SupplierDashboardHome from "../../pages/Supplier/SupplierDashboardHome";
import DeliverStockFormPage from "../../pages/Supplier/DeliverStockFormPage";
import IssueFeedbackPanelPage from "../../pages/Supplier/IssueFeedbackPanelPage";

// Warehouse Staff Pages
import WarehouseDashboard from "../../pages/WarehouseStaff/WarehouseDashboard";
import MoveStockFormPage from "../../pages/WarehouseStaff/MoveStockFormPage";
import RequestStatusPage from "../../pages/WarehouseStaff/RequestStatusPage";
import StockAlertUpdatePage from "../../pages/WarehouseStaff/StockAlertUpdatePage";
import StockReceiving from "../../pages/WarehouseStaff/StockReceiving";

type UserRole =
  | "admin"
  | "manager"
  | "staff-central"
  | "staff-department"
  | "supplier";

type AdminPage = "dashboard" | "users" | "settings" | "blockchain";
type ManagerPage = "dashboard" | "requests" | "stock" | "deliveries";
type DepartmentStaffPage = "dashboard" | "history" | "summary";
type SupplierPage = "dashboard" | "deliveries" | "feedback";
type WarehouseStaffPage =
  | "dashboard"
  | "add-stock"
  | "move-stock"
  | "requests"
  | "alerts";

export default function MainApp() {
  // Make role modifiable for testing
  const [currentRole, setCurrentRole] = useState<UserRole>("admin");

  // Admin state
  const [adminActivePage, setAdminActivePage] =
    useState<AdminPage>("dashboard");

  // Manager state
  const [managerActivePage, setManagerActivePage] =
    useState<ManagerPage>("dashboard");

  // Department staff state
  const [departmentStaffActivePage, setDepartmentStaffActivePage] =
    useState<DepartmentStaffPage>("dashboard");

  // Supplier state
  const [supplierActivePage, setSupplierActivePage] =
    useState<SupplierPage>("dashboard");

  // Warehouse staff state
  const [warehouseStaffActivePage, setWarehouseStaffActivePage] =
    useState<WarehouseStaffPage>("dashboard");

  // 🔹 RoleSwitcher for testing dashboards quickly
  const RoleSwitcher = () => (
    <div className="flex space-x-2 mb-4 px-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentRole("admin")}
      >
        Admin
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentRole("manager")}
      >
        Manager
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentRole("staff-department")}
      >
        Department Staff
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentRole("supplier")}
      >
        Supplier
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentRole("staff-central")}
      >
        Warehouse Staff
      </Button>
    </div>
  );

  // 🔹 Logout handler
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      window.location.reload();
    }
  };

  // 🔹 Shared header component
  const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>Current User</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="text-red-600 hover:text-red-700 bg-transparent"
        >
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </Button>
      </div>
    </div>
  );

  // =========================
  // Admin Dashboard Rendering
  // =========================
  if (currentRole === "admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          title="CBU Central Stores Management"
          subtitle="Administrator Dashboard"
        />
        <RoleSwitcher />
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm border-r">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Admin Panel</h2>
              <p className="text-sm text-muted-foreground">
                System Administration
              </p>
            </div>
            <nav className="p-4 space-y-2">
              <Button
                variant={adminActivePage === "dashboard" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setAdminActivePage("dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant={adminActivePage === "users" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setAdminActivePage("users")}
              >
                User Management
              </Button>
              <Button
                variant={adminActivePage === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setAdminActivePage("settings")}
              >
                System Settings
              </Button>
              <Button
                variant={adminActivePage === "blockchain" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setAdminActivePage("blockchain")}
              >
                Blockchain Logs
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {adminActivePage === "dashboard" && <AdminDashboardHome />}
            {adminActivePage === "users" && <UserManagement />}
            {adminActivePage === "settings" && <SystemSettings />}
            {adminActivePage === "blockchain" && <BlockchainLogs />}
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // Manager Dashboard Rendering
  // =========================
  if (currentRole === "manager") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          title="CBU Central Stores Management"
          subtitle="Manager Dashboard"
        />
        <RoleSwitcher />
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm border-r">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Manager Panel</h2>
              <p className="text-sm text-muted-foreground">
                Operations Management
              </p>
            </div>
            <nav className="p-4 space-y-2">
              <Button
                variant={
                  managerActivePage === "dashboard" ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setManagerActivePage("dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant={managerActivePage === "requests" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setManagerActivePage("requests")}
              >
                Request Approval
              </Button>
              <Button
                variant={managerActivePage === "stock" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setManagerActivePage("stock")}
              >
                Stock Overview
              </Button>
              <Button
                variant={
                  managerActivePage === "deliveries" ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setManagerActivePage("deliveries")}
              >
                Delivery Oversight
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {managerActivePage === "dashboard" && <ManagerDashboardHome />}
            {managerActivePage === "requests" && <RequestApproval />}
            {managerActivePage === "stock" && <StockOverview />}
            {managerActivePage === "deliveries" && <DeliveryOversight />}
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // Department Staff Dashboard Rendering
  // =========================
  if (currentRole === "staff-department") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          title="CBU Central Stores Management"
          subtitle="Department Staff Dashboard"
        />
        <RoleSwitcher />
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm border-r">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Department Staff</h2>
              <p className="text-sm text-muted-foreground">
                Request Management
              </p>
            </div>
            <nav className="p-4 space-y-2">
              <Button
                variant={
                  departmentStaffActivePage === "dashboard"
                    ? "default"
                    : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setDepartmentStaffActivePage("dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant={
                  departmentStaffActivePage === "history" ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setDepartmentStaffActivePage("history")}
              >
                Request History
              </Button>
              <Button
                variant={
                  departmentStaffActivePage === "summary" ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setDepartmentStaffActivePage("summary")}
              >
                New Request
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {departmentStaffActivePage === "dashboard" && (
              <DepartmentDashboard />
            )}
            {departmentStaffActivePage === "history" && <RequestHistoryPage />}
            {departmentStaffActivePage === "summary" && <RequestSummaryPage />}
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // Supplier Dashboard Rendering
  // =========================
  if (currentRole === "supplier") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          title="CBU Central Stores Management"
          subtitle="Supplier Dashboard"
        />
        <RoleSwitcher />
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm border-r">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Supplier Panel</h2>
              <p className="text-sm text-muted-foreground">
                Delivery Management
              </p>
            </div>
            <nav className="p-4 space-y-2">
              <Button
                variant={
                  supplierActivePage === "dashboard" ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setSupplierActivePage("dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant={
                  supplierActivePage === "deliveries" ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setSupplierActivePage("deliveries")}
              >
                Submit Delivery
              </Button>
              <Button
                variant={
                  supplierActivePage === "feedback" ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setSupplierActivePage("feedback")}
              >
                Track Deliveries
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {supplierActivePage === "dashboard" && <SupplierDashboardHome />}
            {supplierActivePage === "deliveries" && <DeliverStockFormPage />}
            {supplierActivePage === "feedback" && <IssueFeedbackPanelPage />}
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // Warehouse Staff Dashboard Rendering
  // =========================
  if (currentRole === "staff-central") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          title="CBU Central Stores Management"
          subtitle="Warehouse Staff Dashboard"
        />
        <RoleSwitcher />
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm border-r">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Warehouse Staff</h2>
              <p className="text-sm text-muted-foreground">
                Inventory Operations
              </p>
            </div>
            <nav className="p-4 space-y-2">
              <Button
                variant={
                  warehouseStaffActivePage === "dashboard" ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setWarehouseStaffActivePage("dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant={
                  warehouseStaffActivePage === "add-stock" ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setWarehouseStaffActivePage("add-stock")}
              >
                Add Stock
              </Button>
              <Button
                variant={
                  warehouseStaffActivePage === "move-stock"
                    ? "default"
                    : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setWarehouseStaffActivePage("move-stock")}
              >
                Move Stock
              </Button>
              <Button
                variant={
                  warehouseStaffActivePage === "requests" ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setWarehouseStaffActivePage("requests")}
              >
                Process Requests
              </Button>
              <Button
                variant={
                  warehouseStaffActivePage === "alerts" ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setWarehouseStaffActivePage("alerts")}
              >
                Stock Alerts
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {warehouseStaffActivePage === "dashboard" && (
              <WarehouseDashboard onNavigate={setWarehouseStaffActivePage} />
            )}
            {warehouseStaffActivePage === "add-stock" && <StockReceiving />}
            {warehouseStaffActivePage === "move-stock" && <MoveStockFormPage />}
            {warehouseStaffActivePage === "requests" && <RequestStatusPage />}
            {warehouseStaffActivePage === "alerts" && <StockAlertUpdatePage />}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
