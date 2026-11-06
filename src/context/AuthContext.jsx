import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/services';
import { TOKEN_KEY } from '../api/client';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY));

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    const me = await authApi.me();
    setUser(me);
    return me;
  }, []);

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) return;
    refresh().catch(() => logout()).finally(() => setLoading(false));
  }, [refresh, logout]);

  useEffect(() => {
    window.addEventListener('cc:logout', logout);
    return () => window.removeEventListener('cc:logout', logout);
  }, [logout]);

  const login = useCallback((token, me) => {
    localStorage.setItem(TOKEN_KEY, token);
    setUser(me);
  }, []);

  const value = useMemo(() => ({ user, loading, login, logout, refresh, setUser }), [user, loading, login, logout, refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
