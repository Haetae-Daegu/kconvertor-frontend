import { useState, useCallback } from 'react'
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL

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

  export const useAccommodation = (): {accommodations: Accommodation[], handleData:() => void, error: string | null, isLoading: boolean }  => {
    const [accommodations, setAccommodation] = useState<Accommodation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleData = useCallback(async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${API_URL}/accommodations`);
        setAccommodation(response.data);
      } catch (err) {
        console.log(err)
        setError('Error fetching accommodations');
      } finally {
        setIsLoading(false);
      }
    }, []);

    return { accommodations, handleData, error, isLoading };
  }