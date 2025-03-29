import useAuthStore from "@/store/useAuthStore";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_ENDPOINT } from "./apiEndpoint";
import { IAuthResponse } from "@/types/authTypes";

interface IFailedRequest {
  resolve: (token: string) => void;
  reject: (error: AxiosError | Error) => void;
}

const BASE_URL = import.meta.env.VITE_API_URL;

// Create axios instance with custom config
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});


let isRefreshing: boolean = false;
let failedQueue: IFailedRequest[] = [];

// Hàm xử lý queue
const processQueue = (error: AxiosError | Error | null, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Kiểm tra lỗi 401 và request chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh, đưa request vào queue
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = useAuthStore.getState().refresh_token;

        if (!refreshToken) {
          useAuthStore.getState().logout();
          return Promise.reject(new Error('No refresh token available'));
        }

        // Gọi API refresh token
        const response: AxiosResponse<IAuthResponse> = await axios.post(
          `${BASE_URL}${API_ENDPOINT.AUTH.REFRESH_TOKEN}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          }
        );

        const newAccessToken: string = response.data.data.access_token;

        // Cập nhật token
        useAuthStore.getState().saveToken(newAccessToken);

        // Xử lý queue
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Cập nhật header và retry request
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError: unknown) {
        const typedError = refreshError instanceof Error ? refreshError : new Error('Unknown refresh error');
        processQueue(typedError, null);
        isRefreshing = false;

        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    // Trả về lỗi nếu không xử lý được
    return Promise.reject(error);
  }
);

export default api;
