import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login as apiLogin, logout as apiLogout, initDB } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDB();
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser.user);
      setRole(currentUser.role);
    }
    setLoading(false);
  }, []);

  const login = (newRole, userId) => {
    apiLogin(newRole, userId);
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser.user);
      setRole(currentUser.role);
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
