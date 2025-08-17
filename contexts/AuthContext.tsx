import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Driver, Passenger } from '@/types/api';
import { mockCurrentUser, mockDriver, mockPassenger } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  driver: Driver | null;
  passenger: Passenger | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  switchRole: (role: 'driver' | 'passenger') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockCurrentUser);
  const [driver, setDriver] = useState<Driver | null>(mockCurrentUser.role === 'driver' ? mockDriver : null);
  const [passenger, setPassenger] = useState<Passenger | null>(mockCurrentUser.role === 'passenger' ? mockPassenger : null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call the API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(mockCurrentUser);
    setIsAuthenticated(true);
    
    if (mockCurrentUser.role === 'driver') {
      setDriver(mockDriver);
      setPassenger(null);
    } else {
      setPassenger(mockPassenger);
      setDriver(null);
    }
  };

  const register = async (userData: any) => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser = {
      ...mockCurrentUser,
      ...userData,
      user_id: Math.random().toString(),
    };
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setDriver(null);
    setPassenger(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const switchRole = (role: 'driver' | 'passenger') => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      
      if (role === 'driver') {
        setDriver(mockDriver);
        setPassenger(null);
      } else {
        setPassenger(mockPassenger);
        setDriver(null);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        driver,
        passenger,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};