import axios from 'axios';

export const TOKEN_KEY = 'cc_token';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api' });

api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem(TOKEN_KEY);
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    // Expired / invalid session -> log out everywhere (but not for login attempts themselves)
    const isAuthCall = err.config?.url?.startsWith('/auth/') && !err.config.url.startsWith('/auth/me');
    if (err.response?.status === 401 && !isAuthCall) {
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(new Event('cc:logout'));
    }
    return Promise.reject(err);
  }
);

export const errMsg = (e) =>
  e?.response?.data?.message || (e?.code === 'ERR_NETWORK' ? 'Cannot reach the server. Is the backend running?' : e?.message) || 'Something went wrong';

export default api;
