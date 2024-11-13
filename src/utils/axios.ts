import axios from "axios";
import { env } from "@/config";
import { getTokens, setTokens, clearTokens } from "@/domains/auth/utils/tokens";
import { refreshIdToken } from "@/domains/auth/api/auth";
import useAuthStore from "@/domains/auth/stores/auth";

const instance = axios.create({
  baseURL: `${env.backendAPI}/api/v1`,
});

instance.interceptors.request.use(
  (config) => {
    const tokens = getTokens();
    if (tokens?.idToken) {
      config.headers.Authorization = `Bearer ${tokens.idToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = getTokens();
      if (tokens?.refreshToken) {
        try {
          const response = await refreshIdToken(tokens.refreshToken);
          setTokens(response.id_token, response.refresh_token);
          originalRequest.headers.Authorization = `Bearer ${response.id_token}`;
          return instance(originalRequest);
        } catch (refreshError) {
          clearTokens();
          useAuthStore.getState().logout();
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
