// import SocialLinks from '@/components/SocialLinks';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import AccommodationList from '@/components/AccommodationList';
import CreateAccommodationModal from '@/components/CreateAccommodationModal';
import { useState, useEffect } from 'react';
import { useAccommodation } from '@/hooks/useAccommodation';
import { useAuth } from "@/contexts/AuthContext";
import SEO from '@/components/SEO';


export default function Main() {
  const MapNoSSR = dynamic(() => import("@/components/Map"), { ssr: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { accommodations, handleData, error, isLoading } = useAccommodation();
  const defaultPos: [number, number] = [35.85395132289147, 128.4871227258607];
  
  useEffect(() => {
    handleData();
  }, [handleData]);

  return (
    <div className="flex flex-col min-h-screen overflow-auto">
      <SEO />
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[350px] overflow-hidden">
        <Image
          src="/cherry.jpg"
          alt="KMU Banner"
          fill
          objectFit="cover"
          priority
          className="opacity-90"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Haetae</h1>
          <h1 className="text-2xl sm:text-2xl md:text-2xl font-bold">The best place <b>to find your next place</b></h1>
        </div>
      </div>
      
      <div className="flex-1 py-10 px-4">
        <div className="flex justify-between items-center mb-4">
          {user &&
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-black rounded-md flex items-center gap-2"
            >
              <a href="#_" className="relative px-6 py-3 font-bold text-black group">
                  <span className="absolute inset-0 w-full h-full border-2 rounded-lg border-black"></span>
                  <span className="relative">Post your accommodation</span>
              </a>
            </button>
          }
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleData()}
              className="relative px-4 py-2 font-medium text-black group"
            >
              <span className="absolute inset-0 w-full h-full border-2 rounded-lg border-black"></span>
              <span className="relative flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh list
              </span>
            </button>
            <p>Showing <span className="font-bold">{accommodations.length}</span> accommodations around <span className="font-bold">Keimyung University</span></p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3 min-h-[400px] md:min-h-[600px] border border-gray-300 rounded-lg shadow-lg overflow-hidden">
            <MapNoSSR accommodations={accommodations} defaultPos={defaultPos} />
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
