import React, { createContext, useContext, useState, useEffect } from 'react';
import { getData, storeData, removeData } from '../utils/AsyncStorage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const GoalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  checkAuthState();

  // 🔍 Debug: Log storage content
  (async () => {
    const u = await getData('user');
    const t = await getData('token');
    console.log('✅ Stored User:', u);
    console.log('✅ Stored Token:', t);
  })();

}, []);

  const checkAuthState = async () => {
    try {
      const savedUser = await getData('user');
      const savedToken = await getData('token');

      if (savedUser && savedToken) {
        setUser(savedUser);
        setToken(savedToken);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData, userToken) => {
    // ✅ Validate token and userData before storing
    if (!userData || !userToken) {
      console.warn('Login failed: Missing user data or token');
      return;
    }

    setUser(userData);
    setToken(userToken);

    await storeData('user', userData);
    await storeData('token', userToken);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await removeData('user');
    await removeData('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};