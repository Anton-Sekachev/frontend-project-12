import { useState, useMemo, useCallback } from 'react';
import AuthContext from '../Contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const getAuthHeader = useCallback(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser?.token) {
      return { Authorization: `Bearer ${savedUser.token}` };
    }
    return {};
  }, []);

  const loggedIn = !!user?.token;

  const value = useMemo(() => ({
    user,
    loggedIn,
    logIn,
    logOut,
    getAuthHeader,
  }), [user, loggedIn, logIn, logOut, getAuthHeader]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
