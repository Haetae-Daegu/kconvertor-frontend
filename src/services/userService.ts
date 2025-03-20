import axios from 'axios';
import { User } from '@/types/user';
import { getAuthHeader } from '@/utils/authUtils';

interface UserUpdate {
  username: string;
  email: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
  async getProfile(): Promise<User> {
    try {
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  async updateProfile(data: UserUpdate): Promise<User> {
    try {
      const response = await axios.put(`${API_URL}/users/me`, data, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  async changePassword(currentPassword: string, newPassword: string) {
    try {
      const response = await axios.post(
        `${API_URL}/users/change-password`,
        {
          current_password: currentPassword,
          new_password: newPassword
        },
        {
          headers: getAuthHeader()
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  async deleteAccount() {
    try {
      const response = await axios.delete(`${API_URL}/users/me`, {
        headers: getAuthHeader()
      });
      return response;
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  }
}; 