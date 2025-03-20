import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios, {AxiosError} from "axios";
import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type User = {
  created_at: string;
  updated_at: string;
  id: string;
  email: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        
        if (storedToken) {
          setToken(storedToken);
          const { data } = await axios.get(`${API_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          
          setUser(data);
        }
      } catch (err: unknown) {
        const error = err as AxiosError
        console.log(error.response?.data)
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      localStorage.setItem('auth_token', data.access_token);
      setToken(data.access_token);
      setUser({
        id: data.id,
        email: data.email,
        username: data.username,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      });
      
      return data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      const message = error.response?.data?.message || error.message || 'Error connection';
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await axios.post(`${API_URL}/auth/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      const message = error.response?.data?.message || error.message || 'Error logout';
      throw new Error(message);
    } finally {
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading,
        token,
        login, 
        logout, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 