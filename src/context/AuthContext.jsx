import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = authService.getCurrentUser();
    setUser(current);
    setLoading(false);
  }, []);

  const login = async (emailOrPhone, password) => {
    const { user: loggedInUser, error } = await authService.login(emailOrPhone, password);
    if (!error && loggedInUser) {
      setUser(loggedInUser);
    }
    return { user: loggedInUser, error };
  };

  const register = async (data) => {
    const { user: registeredUser, error } = await authService.register(data);
    if (!error && registeredUser) {
      setUser(registeredUser);
    }
    return { user: registeredUser, error };
  };

  const verifySms = async (phone, code) => {
    const { user: loggedInUser, error } = await authService.verifySms(phone, code);
    if (!error && loggedInUser) {
      setUser(loggedInUser);
    }
    return { user: loggedInUser, error };
  };

  const loginWithTelegram = async () => {
    const { user: loggedInUser, error } = await authService.loginWithTelegram();
    if (!error && loggedInUser) {
      setUser(loggedInUser);
    }
    return { user: loggedInUser, error };
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateProfile = async (data) => {
    const { user: updatedUser, error } = await authService.updateProfile(data);
    if (!error && updatedUser) {
      setUser(updatedUser);
    }
    return { user: updatedUser, error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: user?.role === 'admin',
        login,
        register,
        verifySms,
        loginWithTelegram,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
