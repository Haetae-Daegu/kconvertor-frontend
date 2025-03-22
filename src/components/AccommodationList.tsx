import React from "react";
import Image from 'next/image';
import { useRouter } from "next/router";
import { Accommodation } from '@/types/accommodation';
import { FaGhost } from "react-icons/fa";
import Loading from "./Loading";

interface AccommodationListProps {
  accommodations: Accommodation[];
  error: string | null;
  isLoading: boolean;
}

const AccommodationList: React.FC<AccommodationListProps> = ({ accommodations, error, isLoading }) => {
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] md:h-[600px]">
        <FaGhost className="w-16 h-16 mb-2 animate-bounce" />
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