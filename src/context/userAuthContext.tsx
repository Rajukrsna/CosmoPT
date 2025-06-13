// context/AuthContext.tsx
import  { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  points: number;
  level: number;
  achievements: any[];
  completedQuizzes: string[];
  visitedPlanets: string[];
}

interface AuthContextType {
  user: User | null;
  loginUser: (name: string, password: string) => Promise<void>;
  registerUser: (name: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const registerUser = async (name: string, password: string) => {
    const res = await axios.post('http://localhost:5000/api/auth/register', { name , password});
    localStorage.setItem('userId', res.data._id);
    setUser(res.data);
  };

  const loginUser = async (name: string, password: string) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', { name, password});
    console.log("authres",res)
    localStorage.setItem('userId', res.data.user._id);
    localStorage.setItem('token', res.data.token);
    console.log("id", res.data.user._id)

    setUser(res.data);
  };

  const logoutUser = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
