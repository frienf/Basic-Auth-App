import React, { createContext, useState, useEffect } from 'react';
import { updateUser as updateUserInBackend } from '../utils/Backend';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to parse stored user:', err);
      localStorage.removeItem('currentUser');
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = async (updatedData) => {
    const updatedUser = await updateUserInBackend(updatedData);
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export default AuthContext;