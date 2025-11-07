import { createContext, useState, useContext, useEffect } from 'react';
import apiClient from './api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  // ▼▼▼ 1. إضافة حالة تحميل جديدة ▼▼▼
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('adminAuthToken');
    if (tokenFromStorage) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${tokenFromStorage}`;
      setToken(tokenFromStorage);
    }
    // 2. بعد الانتهاء من التحقق، نوقف التحميل
    setLoading(false);
  }, []); // يعمل مرة واحدة فقط عند بدء التطبيق

  const login = (newToken) => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    localStorage.setItem('adminAuthToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    delete apiClient.defaults.headers.common['Authorization'];
    localStorage.removeItem('adminAuthToken');
    setToken(null);
  };

  // 3. نمرر حالة التحميل مع بقية القيم
  const value = { token, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}