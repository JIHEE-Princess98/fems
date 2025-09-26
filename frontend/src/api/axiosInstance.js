// src/api/axiosInstance.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: 15000,
});

const refreshClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 15000,
});

const getAccessToken = () => localStorage.getItem('accessToken');
const setAccessToken = (t) => localStorage.setItem('accessToken', t);
const clearAuth = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken')
};

let isRefreshing = false;
let refreshSubscribers = []; // 리프레시 완료를 기다리는 큐

const subscribeTokenRefresh = (cb) => refreshSubscribers.push(cb);
const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  // 성공 시: data만 반환(언래핑)
  (response) => response.data ?? response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(new Error('시간이 초과 되었습니다.'));
    }

    // 401 처리
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken) => {
            if (!newToken) return reject(new Error('토큰 발급 실패'));
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      // 리프레시 담당
      isRefreshing = true;
      try {
        const res = await refreshClient.post('/refresh'); // 쿠키 기반이면 body 불필요
        const newAccessToken = res?.data?.data?.accessToken || res?.data?.accessToken;
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          // 대기 중인 요청들 깨우기
          onRefreshed(newAccessToken);
          // 현재 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
        // 토큰이 없으면 실패 취급
        onRefreshed(null);
        clearAuth();
        return Promise.reject(new Error('Token refresh failed: no token'));
      } catch (e) {
        onRefreshed(null);
        clearAuth();
        // 필요 시: location.href = '/login';
        return Promise.reject(new Error('Token refresh failed'));
      } finally {
        isRefreshing = false;
      }
    }

    // 그 외 상태코드: 메시지 표준화
    const msg =
      error.response.data?.message ||
      error.response.statusText ||
      `HTTP ${error.response.status}`;
    return Promise.reject(new Error(msg));
  }
);

export default apiClient;
