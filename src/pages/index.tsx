// import SocialLinks from '@/components/SocialLinks';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import AccommodationList from '@/components/AccommodationList';
import CreateAccommodationModal from '@/components/CreateAccommodationModal';
import { useState, useEffect } from 'react';
import { useAccommodation } from '@/hooks/useAccommodation';

export default function Main() {
  const MapNoSSR = dynamic(() => import("@/components/Map"), { ssr: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { accommodations, handleData, error, isLoading } = useAccommodation();
  
  useEffect(() => {
    handleData();
  }, [handleData]);

  return (
    <div className="flex flex-col min-h-screen overflow-auto">
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[350px] overflow-hidden">
        <Image
          src="/KMU2.jpg"
          alt="KMU Banner"
          fill
          objectFit="cover"
          priority
          className="opacity-90"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Haetae</h1>
        </div>
      </div>
      
      <div className="flex-1 py-10 px-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Featured Locations</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Listing
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3 min-h-[400px] md:min-h-[600px] border border-gray-300 rounded-lg shadow-lg overflow-hidden">
            <MapNoSSR accommodations={accommodations} />
          </div>
          <div className="w-full md:w-1/3 min-h-[400px] md:min-h-[600px] border border-gray-300 rounded-lg shadow-lg overflow-y-auto">
            <AccommodationList 
              accommodations={accommodations} 
              error={error} 
              isLoading={isLoading} 
            />
          </div>
        </div>
        
        <CreateAccommodationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </div>
  );
}
