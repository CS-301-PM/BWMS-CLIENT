// Common Django API endpoints
export const DJANGO_ENDPOINTS = {
  // Authentication
  LOGIN: "/auth/login/",
  LOGOUT: "/auth/logout/",
  USER_PROFILE: "/auth/user/",
  REGISTER: "/auth/register/",
  REFRESH_TOKEN: "/auth/token/refresh/",

  // Dashboard
  DASHBOARD_STATS: "/api/dashboard/stats/",

  // Requests
  PENDING_REQUESTS: "/api/requests/pending/",
  APPROVE_REQUEST: "/api/requests/{id}/approve/",
  REJECT_REQUEST: "/api/requests/{id}/reject/",
  ALL_REQUESTS: "/api/requests/",

  // Activities
  ACTIVITIES: "/api/activities/",
  RECENT_ACTIVITIES: "/api/activities/recent/",

  // Users
  USERS: "/api/users/",
  USER_DETAIL: "/api/users/{id}/",

  // Inventory
  INVENTORY: "/api/inventory/",
  LOW_STOCK_ALERTS: "/api/inventory/low-stock/",

  // Departments
  DEPARTMENTS: "/api/departments/",

  // Suppliers
  SUPPLIERS: "/api/suppliers/",

  // Warehouse operations
  STOCK_MOVEMENTS: "/api/stock-movements/",
  STOCK_RECEIVING: "/api/stock-receiving/",
};

// Base API URL
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://localhost:8000";

// Helper function to build full API URLs
export const buildApiUrl = (
  endpoint: string,
  params?: Record<string, string>
): string => {
  let url = endpoint;

  // Replace path parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(value));
    });
  }

  return `${API_BASE_URL}${url}`;
};
