/* eslint-disable react/jsx-no-constructed-context-values */

import { useState, useMemo, useCallback } from 'react';
import AuthContext from '../Contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const getAuthHeader = useCallback(() => (
    user?.token ? { Authorization: `Bearer ${user.token}` } : {}
  ), [user]);

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
