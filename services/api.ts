import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../constants/Config';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export const api = {
  get: <T>(url: string, params?: Record<string, unknown>) =>
    apiClient.get<T>(url, { params }).then((res) => res.data),
  post: <T>(url: string, data?: unknown) =>
    apiClient.post<T>(url, data).then((res) => res.data),
  put: <T>(url: string, data?: unknown) =>
    apiClient.put<T>(url, data).then((res) => res.data),
  delete: <T>(url: string) =>
    apiClient.delete<T>(url).then((res) => res.data),
};

export default api;

