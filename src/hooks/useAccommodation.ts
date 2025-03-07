import { useState, useCallback } from 'react'
import { accommodationService } from '@/services/accommodationService'

interface Accommodation {
    id?: number;
    title: string;
    description: string;
    price_per_month: number;
    security_deposit: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    max_guests: number;
    amenities: string[];
    house_rules: string;
    latitude: number;
    longitude: number;
}

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

export const useAccommodation = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await accommodationService.getAll();
      setAccommodations(data);
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createAccommodation = async (data: AccommodationCreate) => {
    try {
      const newAccommodation = await accommodationService.create(data);
      setAccommodations(prev => [...prev, newAccommodation]);
      return newAccommodation;
    } catch (error) {
      throw error;
    }
  };

  return { accommodations, handleData, createAccommodation, error, isLoading };
}