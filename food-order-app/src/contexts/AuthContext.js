import { createContext, useContext, useState, useEffect } from 'react';
import { getUserProfile, refreshToken } from '../services/auth';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const userData = await getUserProfile();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        if (error.response?.status === 401) {
          try {
            const newToken = await refreshToken();
            if (newToken) {
              api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
              const userData = await getUserProfile();
              setUser(userData);
            }
          } catch (refreshError) {
            console.error('Refresh token failed:', refreshError);
            logout();
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (tokenData) => {
    localStorage.setItem('access_token', tokenData.access);
    localStorage.setItem('refresh_token', tokenData.refresh);
    api.defaults.headers.common['Authorization'] = `Bearer ${tokenData.access}`;
    const userData = await getUserProfile();
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);