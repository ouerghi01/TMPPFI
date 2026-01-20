import axios from 'axios';


// --- Configuration ---
const API_BASE_URL = ((import.meta as any).env.VITE_API_URL as string) || 'http://localhost:8081/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default apiClient;