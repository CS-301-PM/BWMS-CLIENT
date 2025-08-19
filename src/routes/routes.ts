export const ROUTES = {
  // Public routes
  LOGIN: "/login",
  REGISTER: "/register",

  // Admin routes
  ADMIN_DASHBOARD: "/admin",
  USER_MANAGEMENT: "/admin/users",
  SYSTEM_SETTINGS: "/admin/settings",
  BLOCKCHAIN_LOGS: "/admin/blockchain",

  // Manager routes
  MANAGER_DASHBOARD: "/manager",
  REQUEST_APPROVAL: "/manager/requests",
  STOCK_OVERVIEW: "/manager/stock",
  DELIVERY_OVERSIGHT: "/manager/deliveries",

  // Warehouse staff routes
  WAREHOUSE_DASHBOARD: "/warehouse",
  ADD_STOCK: "/warehouse/add-stock",
  MOVE_STOCK: "/warehouse/move-stock",
  PROCESS_REQUESTS: "/warehouse/requests",
  STOCK_ALERTS: "/warehouse/alerts",

  // Department staff routes
  DEPARTMENT_DASHBOARD: "/department",
  REQUEST_HISTORY: "/department/history",
  NEW_REQUEST: "/department/new-request",

  // Supplier routes
  SUPPLIER_DASHBOARD: "/supplier",
  SUBMIT_DELIVERY: "/supplier/deliveries",
  TRACK_DELIVERIES: "/supplier/tracking",
};

export type AppRoute = keyof typeof ROUTES;
