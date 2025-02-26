// import SocialLinks from '@/components/SocialLinks';
import Image from 'next/image';
// import KMU2 from '@/assets/KMU2.jpg';
import dynamic from 'next/dynamic';
import ApartmentList from '@/components/ApartmentList';

export default function Main() {
  const MapNoSSR = dynamic(() => import("@/components/Map"), { ssr: false });

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Korean Convertor</h1>
          <p className="mt-2 text-base sm:text-lg">Convertissez facilement vos devises</p>
          <div className="mt-4 w-72 sm:w-80 md:w-96">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 rounded-lg text-black border border-gray-300"
            />
          </div>
        </div>
      </div>
      
      <div className="container flex-1 py-10 px-4">
        <p className="text-lg font-semibold mb-4">Featured Locations</p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3 min-h-[400px] md:min-h-[600px] border border-gray-300 rounded-lg shadow-lg overflow-hidden">
            <MapNoSSR />
          </div>
          <div className="w-full md:w-1/3 flex-1 min-h-[400px] md:min-h-[600px] border border-gray-300 rounded-lg shadow-lg overflow-y-auto p-4">
            <ApartmentList />
          </div>
        </div>
      </div>
    </div>
  );
}
