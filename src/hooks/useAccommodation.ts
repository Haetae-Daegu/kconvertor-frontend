import { useState, useCallback } from 'react'
import { accommodationService } from '@/services/accommodationService'
import { Accommodation } from '@/types/accommodation'

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

type CreateAccommodationData = FormData | AccommodationCreate;

export const useAccommodation = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
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

  const createAccommodation = async (data: CreateAccommodationData) => {
    try {
      const newAccommodation = await accommodationService.create(data);
      setAccommodations(prev => [...prev, newAccommodation]);
      return newAccommodation;
    } catch (error) {
      throw error;
    }
  };

  const updateAccommodation = async (id: number, data: AccommodationCreate) => {
    try {
      const updatedAccommodation = await accommodationService.update(id, data);
      setAccommodations(prev => prev.map(accommodation => 
        accommodation.id === id ? updatedAccommodation : accommodation
      ));
      return updatedAccommodation;
    } catch (error) {
      throw error;
    }
  };

  const updateAccommodationStatus = async (id: number, status: "hidden" | "active" | "booked") => {
    try {
      const updatedAccommodation = await accommodationService.updateStatus(id, status);
      setAccommodations(prev => prev.map(accommodation => 
        accommodation.id === id ? updatedAccommodation : accommodation
      ));
      if (accommodation && accommodation.id === id)
        setAccommodation(updatedAccommodation);
      return updatedAccommodation;
    } catch (error) {
      throw error;
    }
  };
  
  const getAccommodationById = useCallback(async (id: number) => {
    try {
      const data = await accommodationService.getById(id);
      setAccommodation(data);
    } catch (error) {
      throw error;
    }
  }, []); 

  const getAccommodationByUser = useCallback(async () => {
    try {
      const data = await accommodationService.getByUser();
      setIsLoading(true);
      setAccommodations(data);
    } catch (error) {
      setError(error as string);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAccommodation = async (id: number) => {
    try {
      const response = await accommodationService.delete(id);
      setAccommodations(prev => prev.filter(accommodation => accommodation.id !== id));
      if (response.status !== 200)
        throw new Error('Failed to delete accommodation');
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { 
    accommodations,
    accommodation,
    error, 
    isLoading, 
    handleData, 
    createAccommodation, 
    updateAccommodation,
    updateAccommodationStatus,
    getAccommodationById,
    getAccommodationByUser,
    deleteAccommodation
  };
}