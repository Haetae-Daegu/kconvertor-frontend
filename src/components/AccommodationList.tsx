import React from "react";
import Image from 'next/image';
import { useRouter } from "next/router";
import { Accommodation } from '@/types/accommodation';
import { FaGhost } from "react-icons/fa";

interface AccommodationListProps {
  accommodations: Accommodation[];
  error: string | null;
  isLoading: boolean;
}

const AccommodationList: React.FC<AccommodationListProps> = ({ accommodations, error, isLoading }) => {
  const router = useRouter();

  // For loading animation
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 w-full mx-auto h-[400px] md:h-[600px] overflow-y-auto p-2">
        {[1, 2, 3].map((index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm animate-pulse"
            style={{ 
              animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
              animationDelay: `${index * 0.2}s` 
            }}
          >
            <div className="relative h-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
            <div className="p-3">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 mb-2 animate-shimmer"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gradien    t-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 animate-shimmer"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-2/3 animate-shimmer"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/3 animate-shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] md:h-[600px]">
        <p className="text-red-500">There was an error loading the data.</p>
      </div>
    );
  }

  if (!accommodations.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] md:h-[600px]">
        <FaGhost className="w-16 h-16 mb-2 animate-bounce" />
        <p className="text-gray-600">No accommodation available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 w-full mx-auto h-[400px] md:h-[600px] overflow-y-auto p-2">
      {accommodations.map((accommodation) => (
        <div 
          key={accommodation.id} 
          className="bg-white rounded-lg shadow-sm transition-transform transform hover:scale-105 cursor-pointer" 
          onClick={() => router.push(`/accommodation/${accommodation.id}`)}
        >
          <div className="relative h-40">
            <Image
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
              src={accommodation?.image_urls?.[0] || ''}
              alt={accommodation.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <button className="bg-white/80 rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-gray-600">&lt;</span>
              </button>
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <button className="bg-white/80 rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-gray-600">&gt;</span>
              </button>
            </div>
          </div>
          <div className="p-3">
            <h3 className="text-base font-medium mb-1">{accommodation.title}</h3>
            <div className="space-y-0.5">
              <p className="text-sm text-gray-600">₩{accommodation.price_per_month?.toLocaleString()} / month</p>
              <p className="text-sm text-gray-600">Deposit: ₩{accommodation.security_deposit?.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{accommodation.location}</p>
              <p className="text-xs text-gray-500">{accommodation.bedrooms} bed • {accommodation.bathrooms} bath • Max {accommodation.max_guests} guests</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccommodationList;