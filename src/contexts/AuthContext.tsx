import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from "axios";
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
  refreshAccessToken: () => Promise<boolean>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AxiosRequestConfigWithRetry = AxiosRequestConfig & {
  _retry?: boolean;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [refreshTokenTimeoutId, setRefreshTokenTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const logout = useCallback(async (redirect = true) => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    if (redirect) {
      router.push('/auth/login');
    }
  }, [router]);

  const setupRefreshTimer = useCallback(() => {
    if (refreshTokenTimeoutId) {
      clearTimeout(refreshTokenTimeoutId);
    }
    
    const REFRESH_TIME = 25 * 60 * 1000;
    
    const timeoutId = setTimeout(() => {
      refreshAccessToken();
    }, REFRESH_TIME);
    
    setRefreshTokenTimeoutId(timeoutId);
  }, [refreshTokenTimeoutId]);

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const { data } = await axios.post(`${API_URL}/auth/refresh`, {
        refresh_token: refreshToken
      });
      localStorage.setItem('auth_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      setToken(data.access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      
      setupRefreshTimer();
      
      return true;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      await logout(false);
      return false;
    }
  }, [logout, setupRefreshTimer]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        
        if (storedToken) {
          setToken(storedToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          
          const { data } = await axios.get(`${API_URL}/auth/me`);
          setUser(data);
          setupRefreshTimer();
        }
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.data);
        
        if (error.response?.status === 401) {
          const refreshSuccess = await refreshAccessToken();
          if (refreshSuccess) {
            try {
              const { data } = await axios.get(`${API_URL}/auth/me`);
              setUser(data);
            } catch (retryError) {
              console.log(retryError);
              await logout(false);
            }
          }
        } else {
          await logout(false);
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    return () => {
      if (refreshTokenTimeoutId) {
        clearTimeout(refreshTokenTimeoutId);
      }
    };
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfigWithRetry;
        
        if (error.response?.status === 401) {
          originalRequest._retry = true;
          
          const refreshSuccess = await refreshAccessToken();
          if (refreshSuccess && originalRequest) {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('auth_token')}`;
            } else {
              originalRequest.headers = {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
              };
            }
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [refreshAccessToken]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      localStorage.setItem('auth_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user_id', data.id);
      
      setToken(data.access_token);
      setUser({
        id: data.id,
        email: data.email,
        username: data.username,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      });
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      
      setupRefreshTimer();
      
      return data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      const message = error.response?.data?.message || error.message || 'Error connection';
      throw new Error(message);
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
        refreshAccessToken,
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