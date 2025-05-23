import { useState, useCallback } from 'react';
import { userService } from '@/services/userService';
import { User, UserUpdate } from '@/types/user';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';



export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const getUserProfile = useCallback(async () => {
    if (!token) {
      setError("No authentication token available");
      setIsLoading(false);
      return null;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      const data = await userService.getProfile();
      setUser(data);
      return data;
    } catch (err) {
      setError(err as string);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const getUserById = useCallback(async (id: number) => {
    try {
      const data = await userService.getUserById(id);
      return data;
    } catch (error) {
      throw error;
    }
  }, []);

  const updateUserProfile = async (data: UserUpdate, userId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedUser = await userService.updateProfile(data, userId);
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      return updatedUser;
    } catch (error) {
      setError(error as string);
      toast.error('Failed to update profile data');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await userService.changePassword(currentPassword, newPassword);
      return response;
    } catch (error) {
      setError(error as string);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await userService.deleteAccount();
      setUser(null);
      return response;
    } catch (error) {
      setError(error as string);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    getUserProfile,
    getUserById,
    updateUserProfile,
    changePassword,
    deleteAccount
  };
};
