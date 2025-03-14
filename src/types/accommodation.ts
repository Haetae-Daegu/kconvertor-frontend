export interface Accommodation {
  id: number;
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
  image_urls: string[];
  minimum_stay: number;
} 