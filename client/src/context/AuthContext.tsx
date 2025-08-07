import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // The backend expects 'username' and 'password' for login
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      // Save token
      localStorage.setItem('token', data.access_token);
      // Save user info (minimal, since backend does not return user details)
      setUser({ id: '', name: email, email });
      localStorage.setItem('user', JSON.stringify({ id: '', name: email, email }));
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // The backend expects 'username', 'email', and 'password' for register
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg || 'Registration failed');
      }
      // Optionally, auto-login after registration (not implemented here)
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};