import axios from "axios";

// Django typically runs on port 8000 for development
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Django often uses CSRF tokens or JWT for authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  const csrfToken = getCookie("csrftoken"); // For Django CSRF protection

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  return config;
});

// Helper function to get cookies (for CSRF token)
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}
