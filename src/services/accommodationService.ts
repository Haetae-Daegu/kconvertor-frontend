import axios from 'axios';
import { API_URL } from '@/config/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  },
  maxRedirects: 0
});

interface AccommodationCreate {
  title: string;
  description: string;
  price_per_month: number;
  security_deposit?: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  minimum_stay?: number;
  amenities?: string[];
  house_rules?: string;
  latitude?: number;
  longitude?: number;
}

export const accommodationService = {
  async getAll() {
    const response = await axiosInstance.get('/accommodations/');
    return response.data;
  },

  async create(data: FormData | AccommodationCreate) {
    const response = await axiosInstance.post('/accommodations/', data, {
      headers: data instanceof FormData ? {
        'Content-Type': 'multipart/form-data',
      } : {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  async getById(id: number) {
    const response = await axiosInstance.get(`/accommodations/${id}`);
    return response.data;
  },

  async delete(id: number) {
    const response = await axiosInstance.delete(`/accommodations/${id}`);
    return response;
  }
}; 