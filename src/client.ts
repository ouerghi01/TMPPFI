import axios from 'axios';


// --- Configuration ---
const API_BASE_URL = ((import.meta as any).env.VITE_API_URL as string) || 'http://localhost:8081/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Token Management ---
const TOKEN_KEY = 'auth_token';

export const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const PUBLIC_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-email",
  "/auth/verify-phone",
  "/public",
];

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    const url = config.url ?? "";

    const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
      url.includes(endpoint)
    );

    if (token && config.headers && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// --- Response Interceptor ---
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      clearAuthToken();

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;